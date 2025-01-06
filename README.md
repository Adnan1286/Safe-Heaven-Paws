---

# **Safe Haven Paws**

Welcome to **Safe Haven Paws** – your trusted online platform for pet adoption, blog sharing, event management, veterinarian listings, and more. Our goal is to connect pet lovers, veterinarians, and the broader community to help animals in need.

---

## **Features**

1. **User Authentication:**
   - Users can **register** a new account or **log in** to access their profile.
   - The system provides a user dashboard where users can view their **profile** and **current roles**.

2. **Profile Management:**
   - Users can **update** their profile information, including **username**, **email**, and **password**.

3. **Blog Management:**
   - Users can **create** or **post blogs** to the platform.
   - Users can **view blogs** written by others to share experiences and tips.

4. **Event Management:**
   - Users can **create new events** on the platform.
   - **Upcoming events** are shown in **descending order** according to the event date, with the latest event appearing at the top.
   - Admins can **approve or reject** new event requests.

5. **Veterinarian Listings:**
   - Users can **view a list of veterinarians** and filter them based on their **location**.
   - Users can also **add a new veterinarian** with complete details.

6. **Donation System:**
   - Users can **make donations** to support the platform and its operations.
   - Users can **request donations** for their pets by providing the necessary details.
   - Admins can **approve or reject** donation requests.
   - Users can **view the status** of their submitted donation requests.

---

## **Tech Stack**

- **Frontend:**
  - React.js
  - HTML5, CSS3, JavaScript
  - Bootstrap for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for database management

- **Authentication:**
  - JWT (JSON Web Token)

---

## **Installation & Setup**

Follow the steps below to run the project locally.

### **Clone the Repository:**

```bash
git clone https://github.com/Adnan1286/Safe-Heaven-Paws.git
```

### **Install Dependencies:**

1. **Frontend:**

   Navigate to the frontend directory and install dependencies:

   ```bash
   cd client
   npm install
   ```

2. **Backend:**

   Navigate to the backend directory and install dependencies:

   ```bash
   cd ..
   npm install
   ```

### **Set Up Environment Variables:**

1. **Create a `.env` file in the backend directory.**
2. Add the following environment variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. Replace `your_mongodb_connection_string` with your actual MongoDB URI and `your_jwt_secret_key` with a secret key for JWT.

### **Start the Application:**

1. **Run the Backend:**

   In the backend directory, run:

   ```bash
   npm start
   ```

   The backend will be running on [http://localhost:8080](http://localhost:8080).

2. **Run the Frontend:**

   In the frontend directory, run:

   ```bash
   cd client
   npm run dev
   ```

   The frontend will be running on [http://localhost:5173](http://localhost:5173).

---

## **Usage**

1. **Sign Up & Log In:** Create a new account and log in to start using the platform.
2. **Manage Profile:** Update your username, email, and password in your profile dashboard.
3. **Create & View Blogs:** Share your experience by posting blogs, or read blogs from other users.
4. **Create & Manage Events:** Create new events, view upcoming events, and stay updated.
5. **View & Add Veterinarians:** Find veterinarians in your area or add a new one.
6. **Donate & Request Donations:** Support the platform with your donations or request donations for your pet.
7. **Admin Features:** Admins can approve/reject events and donations, and manage veterinarian information.

---

## **Contributing**

Contributions are welcome! If you'd like to contribute, feel free to open an issue or submit a pull request. Please ensure your code follows the project’s coding standards and includes appropriate tests.

---

## **License**

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## **Contact**

For any questions or support, feel free to contact:

- Email: [your-email@example.com](mailto:your-email@example.com)
- GitHub: [https://github.com/Adnan1286](https://github.com/Adnan1286)

---

### **Acknowledgments**

- Special thanks to all contributors who have helped in making **Safe Haven Paws** a reality.
- Inspiration from various open-source projects and the community.

---

This version includes all the features you’ve mentioned, from user management to donation and event functionalities. You can further customize it by adding more details specific to your platform. Let me know if you'd like any further updates!
