"use client";

import Link from "next/link";


import { useRouter } from "next/navigation";  ///in lectue 39 you understand




export default function NotFound() {
  const router = useRouter(); //router 
  return (
    <>
      <div className="notfound-container">
        <h1 className="shake">404</h1>
        <p>Oops! Page not found 😢</p>

        <Link href="/" className="home-btn">
          Go Back Home
        </Link>

       <button onClick={()=> router.back()}>Go Back</button>     {/*  router */}
      </div>

      {/* CSS INSIDE SAME FILE */}
      <style jsx>{`
        .notfound-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          text-align: center;
        }

        .shake {
          font-size: 8rem;
          animation: shake 1.2s infinite;
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
          100% { transform: translateX(0); }
        }

        p {
          font-size: 1.2rem;
        }

        .home-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background: white;
          color: #764ba2;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          transition: transform 0.2s ease;
        }

        .home-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}
