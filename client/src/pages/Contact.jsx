 import { FaPhoneAlt, FaFolderOpen, FaComments } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="dashboard-page page-fade min-h-[calc(100vh-64px)]">
      <h1 className="dashboard-title">Contact Us</h1>
      <p className="dashboard-subtitle">
        We’re here to help you with any questions or issues
      </p>

      <div className="dashboard-grid">

        {/* BY PHONE */}
        <div className="dashboard-card stat-card">
          <FaPhoneAlt size={28} style={{ marginBottom: "10px" }} />
          <h3>By Phone</h3>
          <p>(Mon – Fri, 9am – 4pm)</p>
          <p>India: +91 98765 43210</p>
          <p>International: +1 604 637 0780</p>
        </div>

        {/* START A NEW CASE */}
        <div className="dashboard-card stat-card">
          <FaFolderOpen size={28} style={{ marginBottom: "10px" }} />
          <h3>Start a New Case</h3>
          <p>
            Send us your questions or concerns and our team will assist you.
          </p>
          <button style={{ marginTop: "10px" }}>
            Start Here
          </button>
        </div>

        {/* LIVE CHAT */}
        <div className="dashboard-card stat-card">
          <FaComments size={28} style={{ marginBottom: "10px" }} />
          <h3>Live Chat</h3>
          <p>
            Chat with a member of our support team in real time.
          </p>
          <button style={{ marginTop: "10px" }}>
            Start Chat
          </button>
        </div>

      </div>
    </div>
  );
}