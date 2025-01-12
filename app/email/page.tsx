'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ADMIN_EMAILS = ['benny.wu.new@gmail.com', 'chd-james@skillinsight.ca', 'riri.hong@gmail.com']; // Admin check

export default function EmailSenderPage() {
  const [userEmail, setUserEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [csvInput, setCsvInput] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email);
      setIsAdmin(ADMIN_EMAILS.includes(session.user.email));
    }
  }, [session]);

  // Handle CSV parsing
  const handleCsvInput = () => {
    setError('');
    try {
      
      const rows = csvInput.split('\n').map(row => row.trim()).filter(row => row !== '');
      const parsedEmails = rows.flatMap(row => row.split(',').map(email => email.trim()));

      // Validate emails
      const invalidEmails = parsedEmails.filter(email => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
      if (invalidEmails.length > 0) {
        setError(`Invalid email(s) detected: ${invalidEmails.join(', ')}`);
        return;
      }

      if (parsedEmails.length > 100) {
        setError('⚠️ You cannot send more than 100 emails at once. Please reduce the email count.');
        return;
      }

      setEmailList(parsedEmails);
    } catch (e) {
      setError('Failed to parse CSV. Please ensure it is formatted correctly.');
    }
  };

  // Confirm Sending Emails
  const handleConfirmSend = () => {
    setShowConfirm(true);
  };

  // Accept applicants before sending emails
  const acceptApplicants = async () => {
    try {
      await acceptApplicants(); // Ensure applicants are accepted before sending emails
      
      const response = await fetch('/api/accept-applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: emailList }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to accept applicants.');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };


  // Actual Email Sending Logic
  const handleSendEmails = () => {
    fetch('/api/email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'to': emailList, 'sender': session?.user?.email })
    }).then(res => {
      setShowConfirm(false);
      console.log('Sending emails to:', emailList);
      alert(`✅ Emails sent to ${emailList.length} recipients.`);
      setCsvInput('');
      }
    ).catch(err => {
      alert('❌ Failed to send emails. Please try again.');
    });

    setEmailList([]);
  };

  if (userEmail === null) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="bg-cover h-screen flex flex-col justify-center items-center text-center" style={{ backgroundImage: "url('/static/images/background.png')" }}>
        <h2 className="text-5xl">⛔️ No access</h2>
        <h2 className="text m-3">Only admins can access this page. Please contact Benny or Ri.</h2>
      </div>
    );
  }

  return (
    <div className='bg-cover h-screen flex flex-col justify-center items-center text-center p-4'>
      <h1 className='text-2xl mb-4'>Send Event Acceptance Emails</h1>
      <h2>Welcome, {userEmail}! You have admin access.</h2>

      {/* CSV Input */}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl mb-2">📥 Paste CSV Emails Below:</h2>
        <textarea
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          placeholder="Paste CSV content here (e.g., user1@example.com,user2@example.com)"
          rows={6}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
        <button
          onClick={handleCsvInput}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Parse Emails
        </button>
      </div>

      {/* Error Display */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Parsed Emails Display */}
      {emailList.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-xl mb-2">📋 Parsed Emails:</h2>
          <ul className="bg-gray-100 p-2 rounded-md max-h-32 overflow-y-auto text-black">
            {emailList.map((email, index) => (
              <li key={index} className="text-sm">{email}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm">Total: {emailList.length} email(s)</p>
          <button
            onClick={handleConfirmSend}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Confirm & Send Emails
          </button>
        </div>
      )}

      <p style={{ marginTop: '20px' }}>
        <b>Instructions:</b>
        <ol>
          <li> 1. Paste the comma or line separated email addresses above (e.g. directly from spreadsheet columns) </li>
          <li> 2. Send up to 100 emails at once due to Resend limitations </li>
          <li> 3. Test with your own email first for quality control. Also include your email in the official send </li>

        </ol>

      </p>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">⚠️ Confirm Sending Emails</h2>
            <p>Are you sure you want to send emails to {emailList.length} recipients?</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handleSendEmails}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Yes, Send Emails
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
