import toast from "react-hot-toast";
import { API_PATHS } from "./apiPaths";

// 🔹 Helper to get user data from localStorage
const getUserData = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

// 🔹 Main download + payment logic
export const handleDownloadPayment = async (reactToPrintFn) => {
  const user = getUserData();
  if (!user) {
    toast.error("You must be logged in to download.");
    return;
  }

  const currentUrl = window.location.href;
  const storedPayment = JSON.parse(localStorage.getItem("fapshi_payment")) || {};

  // 🔸 Check if redirected back from Fapshi with transaction info
  const urlParams = new URLSearchParams(window.location.search);
  const transIdFromUrl = urlParams.get("transId");
  const statusFromUrl = urlParams.get("status");

  // ✅ If payment was successful (redirected back with SUCCESSFUL status)
  if (transIdFromUrl && statusFromUrl === "SUCCESSFUL") {
    localStorage.setItem(
      "fapshi_payment",
      JSON.stringify({
        transId: transIdFromUrl,
        status: "SUCCESSFUL",
        link: storedPayment?.link || "",
      })
    );

    toast.success("Payment verified! You can now download your resume.");

    // Allow download ONCE
    reactToPrintFn();

    // Remove record — force new payment next time
    localStorage.removeItem("fapshi_payment");
    return;
  }

  // 🔸 If user has a pending payment (hasn’t completed payment yet)
  if (storedPayment?.status === "PENDING" && storedPayment?.link) {
    toast("Redirecting to your pending payment...");
    window.location.href = storedPayment.link;
    return;
  }

  // 🔸 Otherwise, always start a new payment session
  try {
    const paymentInitResponse = await fetch(`${API_PATHS.FAPSHI.BASE_URL}/initiate-pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiuser: API_PATHS.FAPSHI.API_USER,
        apikey: API_PATHS.FAPSHI.API_KEY, 
      },
      body: JSON.stringify({
        amount: 1100, // 💰 Amount in FCFA (change if needed)
        currency: "XAF",
        reason: "Resume Download",
        email: user.email,
        name: user.name,
        redirectUrl: currentUrl, // User returns to same page after paying
      }),
    });

    const paymentData = await paymentInitResponse.json();

    if (paymentData?.transId && paymentData?.link) {
      // Save payment info for this session
      localStorage.setItem(
        "fapshi_payment",
        JSON.stringify({
          transId: paymentData.transId,
          link: paymentData.link,
          status: "PENDING",
        })
      );

      // Redirect to Fapshi payment page
      window.location.href = paymentData.link;
    } else {
      toast.error("Failed to create payment link.");
    }
  } catch (error) {
    console.error("Payment init failed:", error);
    toast.error("Error initializing payment.");
  }
};
