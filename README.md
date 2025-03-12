# FitUp: Your Ultimate Fitness Companion

FitUp is a fitness app built with **React Native (Expo)** and **Laravel** to help you effortlessly track your food intake, sleep patterns, and daily activities. It also lets you create personalized workout routines based on your specific fitness goals. Thanks to external API integrations for food and workout data, FitUp provides monthly stats so you can monitor your progress over time.

---

## Key Features
- **Macro Tracking**  
  Log your daily calorie and nutrient intake.
- **Personalized Workout Plans**  
  Create routines aligned with your fitness objectives.
- **Monthly Progress**  
  Analyze your stats and trends to continuously improve.

---

## Tech Stack

### Frontend
- **React Native (Expo)** – Cross-platform mobile development made simpler.  
- **React Navigation** – Easy handling of in-app navigation and stack management.  
- **Axios** – Simplified HTTP requests and data fetching.  
- **React Hook Form** – Manage form state and validation efficiently.  
- **Day.js** – Lightweight date/time manipulation for schedules and logs.  
- **Victory Native** – Generate charts and visualizations for monthly progress.  
- **Tailwind CSS** (via nativewind) – Utility-first styling for quick UI creation.

### Backend
- **Laravel** – Robust framework for handling data, APIs, and authentication.

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/FitUp.git
cd fitup
```

### 2. Install Dependencies
- **Frontend (React Native / Expo)**  
  ```bash
  cd frontend
  npm install
  ```
- **Backend (Laravel)**  
  ```bash
  cd ../backend
  composer install
  ```

### 3. Configure Environments
- Create or copy `.env` files in both `frontend` and `backend`.
- Fill in any API keys, database credentials, or other sensitive info.

### 4. Start the Backend
From the **backend** directory:
```bash
php artisan serve
```
This runs the Laravel server at http://127.0.0.1:8000 by default.

### 5. Start the Frontend
From the **frontend** directory:
```bash
npm start
```
This launches the Expo development tools for running on an emulator or real device.

---

## Project Status
FitUp is still in development. We’re continually refining features and overall user experience. If you have questions, suggestions, or want to contribute, please [open an issue](../../issues) or submit a pull request.

Stay fit and organized with FitUp!
