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

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType | null>(null);
  const [scheduleDisabled, setScheduleDisabled] = useState(true); // Change this when hackers are accepted
  const [qrcodeDisabled, setQrcodeDisabled] = useState(true); // Change this when hackers are accepted
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state for RSVP submission

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
        } else {
          setError("Invalid application status received");
        }

        if (data.status === "CONFIRMED" || data.status === "ACCEPTED") {
          setQrcodeDisabled(false);
        }
      } catch (err) {
        setError("Error loading application status");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
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
          src={`/static/images/status-${status === "ACCEPTED" || status === "CONFIRMED" ? "submitted" : "notsubmitted"
            }.png`}
          alt={status || "Loading"}
          className="absolute right-0 -top-10 z-0"
        />

        <h2 className="font-light text-lg drop-shadow-[0_0px_5px_rgba(0,0,0,0.5)]">
          Application Status
        </h2>

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
            {status
              ? statusMapping[status] || "Unknown Status"
              : "Status is null"}
          </h2>
        )}

        {/* Apply Button */}
        {status === "NOT_APPLIED" && (
          <div className="text-xs z-50 mt-1 mb-3 text-gray-400">
            If you've received an acceptance email, but you're seeing a Not Applied status, please follow the following steps before contacting us. We recently re-enabled Google sign-in. You probably used email sign-in to submit your application. Try logging out and then using email sign-in using the email which you received the acceptance email from. We apologize for the inconvenience.
          </div>
        )}

        {/* RSVP Button */}
        {status === "ACCEPTED" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-32 z-50">RSVP Now!</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>RSVP Confirmation</DialogTitle>
                <DialogDescription>
                  By clicking the RSVP button, you are agreeing to be
                  photographed during the event.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start space-x-4">
                <Button onClick={onRSVP} disabled={isSubmitting}>
                  RSVP
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Message for Confirmed Status */}
        {status === "CONFIRMED" && (
          <p className="text-green-500 font-bold">
            See you soon!
          </p>
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
            <img src="/static/images/CameraFrame.png" alt="QR Code" className="absolute right-10 bottom-8 z-0 scale-75" />
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
