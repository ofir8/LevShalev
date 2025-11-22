import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const AccessibilityStatement = () => {
    return (
        <div dir="rtl" className="font-sans text-slate-800 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6 py-12 max-w-4xl">
                <Link to="/" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-8 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5 ml-1" />
                    חזרה לדף הבית
                </Link>

                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b pb-6">הצהרת נגישות</h1>

                    <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                        <p>
                            אנו ב<strong>"לב שליו"</strong> רואים חשיבות עליונה במתן שירות שוויוני לכלל הלקוחות ובשיפור הנגישות לאנשים עם מוגבלות.
                            אנו משקיעים משאבים רבים בהנגשת האתר והפיכתו לזמין, נוח וידידותי לשימוש עבור אנשים עם מוגבלויות.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">רמת הנגישות</h2>
                        <p>
                            אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג 2013.
                            ההתאמות בוצעו על פי המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG2.0 הבינלאומי.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">תיקונים והתאמות שבוצעו</h2>
                        <ul className="list-disc list-inside space-y-2 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <li>האתר מותאם לצפייה ונתמך על ידי הדפדפנים הנפוצים.</li>
                            <li>תכני האתר כתובים בשפה ברורה, מסודרת והיררכית.</li>
                            <li>תכני האתר מותאמים לכל סוגי המסכים והרזולוציות.</li>
                            <li>אמצעי הניווט באתר פשוטים וברורים.</li>
                            <li>האתר מאפשר שינוי גודל הגופן על ידי שימוש במקש Ctrl וגלגלת העכבר.</li>
                            <li>אין באתר שימוש בתצוגת טקסט נע או מהבהב.</li>
                            <li>התמונות באתר כוללות הסבר טקסטואלי חלופי (Alt Text).</li>
                            <li>טפסי יצירת הקשר נגישים לקוראי מסך.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">רכיב נגישות</h2>
                        <p>
                            באתר מוטמע תוסף נגישות מתקדם (UserWay) המאפשר גלישה מותאמת ונוחה. התפריט מאפשר, בין היתר:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mr-4">
                            <li>הגדלת טקסט</li>
                            <li>שינוי ניגודיות (בהיר/כהה/היפוך צבעים)</li>
                            <li>הדגשת קישורים</li>
                            <li>פונט קריא</li>
                            <li>ועוד...</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">יצירת קשר בנושא נגישות</h2>
                        <p>
                            אנו ממשיכים במאמצים לשפר את נגישות האתר כחלק ממחויבותנו לאפשר לכלל האוכלוסייה, כולל אנשים עם מוגבלויות, לקבל את השירות הנגיש ביותר.
                            במידה ונתקלתם בבעיה או שיש לכם הערה בנושא, נשמח שתצרו עמנו קשר:
                        </p>
                        <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 mt-4">
                            <p className="font-bold text-sky-900">רכז נגישות: הנהלת <strong>לב שליו</strong></p>
                            <p className="mt-2">טלפון: <a href="tel:0527242507" className="text-sky-600 hover:underline font-bold">052-724-2507</a></p>
                            <p>אימייל: <a href="mailto:niponata1989@gmail.com" className="text-sky-600 hover:underline font-bold">niponata1989@gmail.com</a></p>
                        </div>

                        <p className="text-sm text-slate-500 mt-8">
                            תאריך עדכון ההצהרה: 22/11/2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityStatement;
