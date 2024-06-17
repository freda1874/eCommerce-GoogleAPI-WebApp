import LocationEnabler from '../components/LocationEnabler';
import 'bootstrap/dist/css/bootstrap.css';
//deletes items before a certain date
//
const delete_items = async () => {
  console.log("in delete items") //date before a certain time
  const targetDate = new Date('2023-08-10T15:36:19.506Z');
  try { //getting sent to server.js
    const response = await fetch(`/view/getItemsByDate/${targetDate}`);
    const items = await response.json();
    for (const item of items) {
      console.log("deleting " + item._id)
      // Perform the delete operation on each item using a DELETE request.
      await fetch(`db/items/${item._id}`, { method: 'DELETE' });
    }
  } catch (error) {
    console.error('Error fetching items:', error);
  }

};

const Contact = () => {
  const deleteItems = async (e) => {
    e.preventDefault();
    const results = await delete_items();
  };
  return (
      <div className="contact-para">
        <h2>Contact Us</h2>

        <div className="contact-block">
        <h4>We'd Love to Hear From You!</h4>
        <p>Got a question, a suggestion, or just want to say hello? We're all ears! At Shopful, we value our customers and aim to provide
          exceptional service. Feel free to get in touch with us through any of the following channels:</p>
        </div>

        <div className="contact-block">
        <h4>Customer Support:</h4>
        <p>Our dedicated support team is here to assist you with any inquiries or concerns. Whether you need help with an order, have questions
          about our products, or require technical assistance, we're ready to lend a helping hand. Reach out to our friendly support representatives
          at <b>support@shopful.com</b> or give us a call at <b>(555) 123-4567</b> during our business hours.</p>
        </div>

        <div className="contact-block">
        <h4>Feedback and Suggestions:</h4>
        <p>Your feedback is what helps us improve and grow! We appreciate hearing from you about your experience with Shopful. If you have any
          suggestions for how we can enhance our website or services, please drop us an email at <b>feedback@shopful.com</b>. We look forward to making
          your shopping experience even better!</p>
        </div>
        
        <div className="contact-block">
        <h4>Press and Media Inquiries:</h4>
        <p>Are you a member of the press or a media representative interested in featuring Shopful? We'd love to collaborate! For press
          releases, interviews, or any media-related inquiries, please contact us at <b>media@shopful.com</b></p>
        </div>

        <div className="contact-block">
        <h4>Business Partnerships:</h4>
        <p>If you're a brand or business interested in partnering with Shopful, we're excited to explore potential collaborations.
          Drop us a line at <b>partnerships@shopful.com</b>, and let's discuss how we can work together to create an extraordinary shopping
          experience for our customers.</p>
        </div>

        <div className="contact-block">
        <h4>Social Media:</h4>
        <p>Stay connected with us on social media! Follow us on Instagram, Twitter, and Facebook to catch the latest updates, trends,
          and special promotions.</p>
        </div>

        <div className="contact-block">
        <h4>Visit Us:</h4>
        <p>While we primarily operate as an online platform, we're always thrilled to meet our customers in person! If you're around our
          headquarters or just passing by, feel free to drop in at:<br /><br />
          Shopful Inc.<br />
          123 Shopping Avenue,<br />
          Citytown, ST 12345,<br />
          United States</p>
        </div>

        <div className="contact-block">
        <h4>Office Hours:</h4>
        <p>Monday - Friday: 9:00 AM - 6:00 PM (EST)
          <br />
          <br />
          Thank you for choosing Shopful as your shopping destination. We're here to make your shopping experience extraordinary, so don't
          hesitate to get in touch with us. Your satisfaction is our top priority!</p>
        </div>
      </div>
  )
}

export default Contact
