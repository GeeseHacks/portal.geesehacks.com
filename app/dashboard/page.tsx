"use client";

import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType | null>(null);
  const [scheduleDisabled, setScheduleDisabled] = useState(true); // Change this when hackers are accepted
  const [qrcodeDisabled, setQrcodeDisabled] = useState(true); // Change this when hackers are accepted
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state for RSVP submission
  const [geeseCoinBalance, setGeeseCoinBalance] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal control
  const { data: session } = useSession();

  type StatusType =
    | "ACCEPTED"
    | "REJECTED"
    | "WAITLIST"
    | "NOT_APPLIED"
    | "APPLIED"
    | "CONFIRMED";

  const statusMapping: Record<StatusType, string> = {
    ACCEPTED: "Accepted",
    REJECTED: "Rejected",
    WAITLIST: "Waitlisted",
    NOT_APPLIED: "Not Applied",
    APPLIED: "Waitlisted", // Classify all applied hackers as waitlisted since all acceptances have been sent out
    CONFIRMED: "RSVP Confirmed",
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/users/status");
        const data = await response.json();

        // Validate the status received from the API
        if (data.status && Object.keys(statusMapping).includes(data.status)) {
          setStatus(data.status as StatusType);
          // Show modal if status is not CONFIRMED or ACCEPTED
          if (!["CONFIRMED"].includes(data.status)) {
            alert(data.status);
            setShowModal(true);
          }
        } else {
          setError("Invalid application status received");
        }

        if (data.status === "CONFIRMED") {
          setQrcodeDisabled(false);
        }
      } catch (err) {
        setError("Error loading application status");
      } finally {
        setLoading(false);
      }
    };

    const fetchGeeseCoinBalance = async () => {
      const userId = session?.user?.id;
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        console.log(data);
        if (data.net_worth) {
          setGeeseCoinBalance(data.net_worth);
        }
      } catch (err) {
        console.error("Error loading geese coin balance");
      }
    };

    fetchStatus();
    fetchGeeseCoinBalance();
  }, []);

  const onRSVP = async () => {
    try {
      setIsSubmitting(true); // Start loading
      const userId = session?.user?.id;

      const toastId = toast.loading("Submitting RSVP...");
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm RSVP");
      }

      const data = await response.json();
      setStatus(data.status); // Optionally update the status if returned from API

      toast.success("RSVP successful!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to RSVP. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <>
      {/* Unclosable Modal */}
      {showModal && (
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Access Denied</DialogTitle>
              <DialogDescription>
                You do not have access to this page. Please contact support if you believe
                this is an error.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      <div>
        <h1 className="text-4xl mt-5 mb-2">Home</h1>
        <p className="text-gray-500">
          Welcome fellow Geese. Here&apos;s everything you&apos;ll need for the
          event!
        </p>
      </div>

      {/* Application Status Card */}
      <div
        className="
          bg-gradient-to-r from-darkpurple to-darkteal 
          p-8 lg:p-12 rounded-xl w-full min-h-56 h-2/6 space-y-4 
          relative overflow-hidden 
          flex flex-col justify-center
        "
      >
        {/* Status Image */}
        {/* Use the rejected image if the status is applied */}

        <img
          src={`/static/images/geesecoin.png`}
          alt={status || "Loading"}
          className="absolute right-10 -top-10 z-0 h-full"
        />

        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold drop-shadow-[0_0px_5px_rgba(0,0,0,0.5)]">
            GeeseCoin Balance
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-gray-300" />
              </TooltipTrigger>
              <TooltipContent>
                <p>GeeseCoins get added to your intial score during judging!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-100">
          Attend workshops to earn more GeeseCoins!
        </p>

        {/* Status or Loading/Error Message */}
        {loading ? (
          <h2 className="font-semibold text-4xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)]">
            Loading...
          </h2>
        ) : error ? (
          <h2 className="font-semibold text-4xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)] text-red-500">
            {error}
          </h2>
        ) : (
          <h2 className="font-semibold text-4xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)]">
            ${geeseCoinBalance}
          </h2>
        )}

      </div>

      {/* Additional Cards */}
      <div className="grid lg:grid-cols-2 gap-8 max-h-4/6 lg:min-h-48 mb-8">
        {/* QR Card */}
        <Link
          href={qrcodeDisabled ? "#" : "/dashboard/qrcode"}
          className={`relative rounded-xl bg-gradient-to-r from-darkpurple to-darkteal p-8 lg:p-12 overflow-hidden transition-transform duration-300 
      ${qrcodeDisabled
              ? "pointer-events-none opacity-50"
              : "hover:scale-102 hover:drop-shadow-[0_0px_15px_rgba(48,133,159,0.5)]"
            } h-48`}
        >
          <div className="">
            <img
              src="/static/images/CameraFrame.png"
              alt="QR Code"
              className="absolute right-10 bottom-8 z-0 scale-75"
            />
            <h2 className="text-[30px] font-semibold">QR Code</h2>
            <p className="text-white-500">Your ID at Geesehacks</p>
          </div>
        </Link>

        {/* Schedule Card */}
        <Link
          href={scheduleDisabled ? "#" : "/dashboard/schedule"}
          className={`relative rounded-xl bg-gradient-to-r from-darkpurple to-darkteal p-8 lg:p-12 overflow-hidden transition-transform duration-300 
      ${scheduleDisabled
              ? "pointer-events-none opacity-50"
              : "hover:scale-102 hover:drop-shadow-[0_0px_15px_rgba(48,133,159,0.5)]"
            } h-48`}
        >
          <img
            src="/static/images/ScheduleIcon.png"
            alt="Schedule"
            className="absolute -right-24 -bottom-8 -z-10 scale-50"
          />
          <h2 className="text-[30px] font-semibold">Schedule</h2>
          <p className="text-white-500">A list of fun events</p>
        </Link>
      </div>
    </>
  );
};

export default Home;
