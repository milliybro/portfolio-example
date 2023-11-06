const CheckClient = () => {
  const adminEmail = "shohrux-rustamov@mail.ru";



  const messageAdmin = () => {
    const subject = "Message from User";
    const body = "Hello Admin,\n\nI ask you to give me the client role.";
    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };
  return (
    <div className="modal-overlay">
      <div
        className="modal client_checking"
        style={{
          maxWidth: "700px",
          backgroundColor: "#ffa700",
          color: "black",
        }}
      >
        <h2>
          Hello <span>User</span> !!!
        </h2>
        <h3>In our project you can see:</h3>
        <ul className="user-modal">
          <li>Create a portfolio for yourself</li>
          <li>Education data entry</li>
          <li>Skills can be added</li>
          <li>You can add your own portfolio sites</li>
          <li>Change added information</li>
          <li>Delete data</li>
          <li>View anytime</li>
        </ul>
        <p>
          You do not currently have access to our website. To enter, send a
          request to become a client to Admin
        </p>
        <div className="modal-actions">
          {/* <button onClick={callAdmin} className="cancel_confirm">
            Call Admin
          </button> */}
          <button onClick={messageAdmin}>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default CheckClient;
