import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

const ThankYou = () => {
    return (
        <div dir="rtl" className="font-sans text-slate-800 bg-slate-50 min-h-screen flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl text-center border border-slate-100 animate-in zoom-in-95 duration-500">

                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">הפרטים נשלחו בהצלחה!</h1>

                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                    תודה שפנית אלינו. <br />
                    קיבלנו את פנייתך וצוות <strong>"לב שליו"</strong> יחזור אליך בהקדם האפשרי.
                </p>

                <div className="flex justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-sky-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-700 transition-all hover:scale-105 shadow-lg shadow-sky-200"
                    >
                        <Home className="w-5 h-5" />
                        חזרה לדף הבית
                    </Link>
                </div>

                {/* 
            Place for Tracking Pixels / Google Analytics Conversion Code 
            Example:
            <script>
              gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXX/label'});
            </script>
        */}
            </div>
        </div>
    );
};

export default ThankYou;
