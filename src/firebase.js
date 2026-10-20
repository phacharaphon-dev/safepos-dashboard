import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // สำหรับฐานข้อมูล Firestore
import { getDatabase } from "firebase/database"; // สำหรับฐานข้อมูล Realtime Database

// Config ของโปรเจกต์ SAFEPOS ที่เพื่อนให้มา
const firebaseConfig = {
  apiKey: "AIzaSyCw3J9Gl96qyimX_g15UjsHtV9gD7Gw94U",
  authDomain: "safepos-344a3.firebaseapp.com",
  databaseURL: "https://safepos-344a3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "safepos-344a3",
  storageBucket: "safepos-344a3.firebasestorage.app",
  messagingSenderId: "481208339217",
  appId: "1:481208339217:web:36b8784df45ccd14461ab0",
  measurementId: "G-FFMPQS26Q1"
};

// เริ่มต้นการเชื่อมต่อ Firebase
const app = initializeApp(firebaseConfig);

// ส่งออกตัวแปรเพื่อให้หน้า Dashboard หรือหน้าอื่นๆ ดึงไปใช้งานได้
export const db = getFirestore(app);   // เรียกใช้ db ถ้าเพื่อนเก็บข้อมูลใน Firestore
export const rtdb = getDatabase(app);  // เรียกใช้ rtdb ถ้าเพื่อนเก็บข้อมูลใน Realtime Database