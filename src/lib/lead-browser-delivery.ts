// Public browser integration documented at https://formsubmit.co/ajax-documentation.
// The recipient is fixed; no account credentials or server keys enter this module.
export async function sendBrowserNotification(mail: {
  subject: string; text: string; email: string; name: string;
}): Promise<boolean> {
  try {
    const response = await fetch("https://formsubmit.co/ajax/lsfencingandmetalwork%40gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: mail.subject, _replyto: mail.email, _template: "table",
        name: mail.name, email: mail.email, message: mail.text,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.warn("[LS email] Browser delivery HTTP", response.status);
      return false;
    }
    const receipt = await response.json();
    console.info("[LS email] Provider acknowledgement", receipt?.success, String(receipt?.message ?? "").slice(0, 300));
    return (receipt?.success === true || receipt?.success === "true")
      && !/activat|confirm.{0,20}email/i.test(String(receipt?.message ?? ""));
  } catch (error) {
    console.warn("[LS email] Browser delivery unavailable", error instanceof Error ? error.message : "Unknown error");
    return false;
  }
}
