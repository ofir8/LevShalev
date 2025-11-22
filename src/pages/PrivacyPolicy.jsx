import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div dir="rtl" className="font-sans text-slate-800 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6 py-12 max-w-4xl">
                <Link to="/" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-8 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5 ml-1" />
                    חזרה לדף הבית
                </Link>

                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b pb-6">מדיניות פרטיות</h1>

                    <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                        <p>
                            חברת <strong>"לב שליו"</strong> (להלן: "החברה") מכבדת את פרטיות המשתמשים באתר האינטרנט שהיא מפעילה ומנהלת.
                            מטרת התנאים הבאים היא להסביר מהי מדיניות הפרטיות הנהוגה באתר, וכיצד משתמשת החברה במידע הנמסר לה על-ידי המשתמשים או הנאסף על-ידה בעת השימוש באתר.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. כללי</h2>
                        <p>
                            בעת שימוש בשירותי האתר נאסף מידע עליך. חלק מהמידע מזהה אותך באופן אישי, כלומר בשמך ובכתובתך, מוצרים ושירותים שרכשת או ביקשת למכור, אמצעי התשלום ששימשו אותך, וכיו"ב. זהו המידע שאתה מוסר ביודעין, לדוגמה בעת רישום לשירותים באתר. חלק מהמידע אינו מזהה אותך אישית ואינו נשמר ביחד עם פרטיך. זהו מידע סטטיסטי ומצטבר. לדוגמה, פרסומות שקראת באתר, העמודים שבהם צפית, ההצעות והשירותים שעניינו אותך, כתובת האינטרנט (IP) שממנה פנית ועוד.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. רישום לשירותים</h2>
                        <p>
                            ככל שנדרשים פרטים אישיים בעת רישום לשירותים באתר או בעת רכישת מוצרים בהם, החברה תבקש ממך רק את המידע הנחוץ במישרין לאספקת השירותים או לרכישת המוצרים.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. מאגר המידע</h2>
                        <p>
                            הנתונים שנאספו יישמרו במאגר המידע של החברה ובאחריותה.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. השימוש במידע</h2>
                        <p>
                            השימוש במידע שנאסף, ייעשה רק על פי מדיניות פרטיות זו או על פי הוראות כל דין, על מנת –
                        </p>
                        <ul className="list-disc list-inside space-y-1 mr-4">
                            <li>לאפשר להשתמש בשירותים שונים באתר.</li>
                            <li>לשפר ולהעשיר את השירותים והתכנים המוצעים באתר.</li>
                            <li>לשנות או לבטל שירותים ותכנים קיימים.</li>
                            <li>לצורך רכישת מוצרים ושירותים באתר - לרבות פרסום מידע ותכנים.</li>
                            <li>כדי להתאים את המודעות ותכנים שיוצגו בעת הביקור באתר לתחומי ההתעניינות שלך.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. מסירת מידע לצד שלישי</h2>
                        <p>
                            החברה לא תעביר לצדדים שלישיים את פרטיך האישיים והמידע שנאסף על פעילותך באתר אלא במקרים המפורטים להלן:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mr-4">
                            <li>במקרה של מחלוקת משפטית בינך לבין החברה שתחייב חשיפת פרטיך.</li>
                            <li>אם תבצע באתר, פעולות שבניגוד לדין.</li>
                            <li>אם יתקבל צו שיפוטי המורה למסור את פרטיך או המידע אודותיך לצד שלישי.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">6. Cookies</h2>
                        <p>
                            אתר החברה משתמש ב"עוגיות" (Cookies) לצורך תפעולו השוטף והתקין, ובכלל זה כדי לאסוף נתונים סטטיסטיים אודות השימוש באתר, לאימות פרטים, כדי להתאים את האתר להעדפותיך האישיות ולצורכי אבטחת מידע.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">7. אבטחת מידע</h2>
                        <p>
                            החברה מיישמת באתריה מערכות ונהלים עדכניים לאבטחת מידע. בעוד שמערכות ונהלים אלה מצמצמים את הסיכונים לחדירה בלתי-מורשית, אין הם מעניקים בטחון מוחלט. לכן, החברה לא מתחייבת ששירותיה יהיו חסינים באופן מוחלט מפני גישה בלתי-מורשית למידע המאוחסן בהם.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
