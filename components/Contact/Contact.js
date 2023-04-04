import Headings from "../Heading/Headings";

const letsTalk = "Let's Talk";

export default function Contact() {
  // ! These API keys are meant to be public while using the EmailJs services and it's endpoints.
  const SERVICE_ID = "service_iquonrh";
  const TEMPLATE_ID = "template_1ipf8jz";
  const USER_ID = "emWpaSnr3C9Ar-DR_";

  function handleOnSubmit(e) {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        Swal.fire({ title: "Message Sent!", icon: "success" });
      },
      (error) => {
        Swal.fire({ title: "Ooops, something went wrong!", icon: "error" });
      }
    );
    // * clears the form after sending the email
    e.target.reset();
  }

  return (
    <section id="contact" className="container px-4 py-10 mx-auto">
      <Headings title="Contact Us"/>
     

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 caret-red-600 md:grid-cols-2">
          <input
            name="from_name"
            placeholder="Name"
            className="inputStyle"
            required
          />
          <input
            name="from_email"
            placeholder="Email"
            className="inputStyle"
            required
          />
        </div>
        <input
          name="from_subject"
          placeholder="Subject"
          className="inputStyle caret-red-600"
          required
        />
        <textarea
          name="message"
          className="inputStyle caret-red-600"
          placeholder="Message"
          rows="6"
          required
        />
        <div>
          <button type="submit" className="btn transition duration-500">
            Share Message
          </button>
        </div>
      </form>
    </section>
  );
}
