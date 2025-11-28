import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Save, Lock, Layout, Palette, Type, Globe, Activity, Plus, Trash2, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';
// import GrapesJSEditor from '../admin/grapes/GrapesJSEditor';

const Admin = () => {
    const { config, updateConfig, loading } = useConfig();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('general');
    const [localConfig, setLocalConfig] = useState(null);
    const [saveStatus, setSaveStatus] = useState('');
    const [activeContentSection, setActiveContentSection] = useState('hero');

    useEffect(() => {
        if (config) {
            setLocalConfig(JSON.parse(JSON.stringify(config)));
        }
    }, [config]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                setIsAuthenticated(true);
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login error');
        }
    };

    const handleSave = async () => {
        setSaveStatus('saving');
        const success = await updateConfig(localConfig);
        if (success) {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus(''), 2000);
        } else {
            setSaveStatus('error');
        }
    };

    const handleChange = (section, key, value) => {
        setLocalConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const handleNestedChange = (section, subsection, key, value) => {
        setLocalConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subsection]: {
                    ...prev[section][subsection],
                    [key]: value
                }
            }
        }));
    };

    const handleContentChange = (section, key, value) => {
        setLocalConfig(prev => ({
            ...prev,
            content: {
                ...prev.content,
                [section]: {
                    ...prev.content[section],
                    [key]: value
                }
            }
        }));
    };

    const handleListChange = (section, listName, index, key, value) => {
        setLocalConfig(prev => {
            const newList = [...prev.content[section][listName]];
            if (typeof newList[index] === 'string') {
                newList[index] = value;
            } else {
                newList[index] = { ...newList[index], [key]: value };
            }
            return {
                ...prev,
                content: {
                    ...prev.content,
                    [section]: {
                        ...prev.content[section],
                        [listName]: newList
                    }
                }
            };
        });
    };

    const addListItem = (section, listName, template) => {
        setLocalConfig(prev => ({
            ...prev,
            content: {
                ...prev.content,
                [section]: {
                    ...prev.content[section],
                    [listName]: [...prev.content[section][listName], template]
                }
            }
        }));
    };

    const removeListItem = (section, listName, index) => {
        setLocalConfig(prev => ({
            ...prev,
            content: {
                ...prev.content,
                [section]: {
                    ...prev.content[section],
                    [listName]: prev.content[section][listName].filter((_, i) => i !== index)
                }
            }
        }));
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <div className="flex justify-center mb-6 text-sky-600">
                        <Lock size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Admin Login</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>
                        <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors font-medium">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    if (!localConfig) return null;

    const tabs = [
        { id: 'general', label: 'General & SEO', icon: Globe },
        { id: 'design', label: 'Design & Colors', icon: Palette },
        { id: 'content', label: 'Content', icon: Type },
        { id: 'webhooks', label: 'Webhooks', icon: Activity },
    ];

    const contentSections = [
        { id: 'hero', label: 'Hero Section' },
        { id: 'about', label: 'About & Why Us' },
        { id: 'services', label: 'Services' },
        { id: 'audience', label: 'Target Audience' },
        { id: 'careers', label: 'Careers' },
        { id: 'faq', label: 'FAQ' },
        { id: 'contact', label: 'Contact' },
        { id: 'footer', label: 'Footer' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full overflow-y-auto">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-xl font-bold text-slate-800">Site Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-sky-50 text-sky-600 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-100">
                    <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition-colors font-bold shadow-lg shadow-sky-200">
                        <Save size={20} />
                        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 ml-64 p-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">{tabs.find(t => t.id === activeTab)?.label}</h2>

                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-lg font-semibold mb-4">Site Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Site Title</label>
                                        <input
                                            type="text"
                                            value={localConfig.general.siteTitle}
                                            onChange={(e) => handleChange('general', 'siteTitle', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Site Description</label>
                                        <textarea
                                            rows="3"
                                            value={localConfig.general.siteDescription}
                                            onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-lg font-semibold mb-4">Tracking Pixels</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Head Scripts</label>
                                        <textarea
                                            rows="4"
                                            value={localConfig.general.pixels.head}
                                            onChange={(e) => handleNestedChange('general', 'pixels', 'head', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-mono text-sm"
                                            placeholder="<script>...</script>"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Body Scripts</label>
                                        <textarea
                                            rows="4"
                                            value={localConfig.general.pixels.body}
                                            onChange={(e) => handleNestedChange('general', 'pixels', 'body', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-mono text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Thank You Page Scripts</label>
                                        <textarea
                                            rows="4"
                                            value={localConfig.general.pixels.thankYou}
                                            onChange={(e) => handleNestedChange('general', 'pixels', 'thankYou', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-mono text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'design' && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-lg font-semibold mb-4">Colors</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Primary Color</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={localConfig.design.primaryColor}
                                                onChange={(e) => handleChange('design', 'primaryColor', e.target.value)}
                                                className="h-10 w-10 rounded cursor-pointer border-0"
                                            />
                                            <input
                                                type="text"
                                                value={localConfig.design.primaryColor}
                                                onChange={(e) => handleChange('design', 'primaryColor', e.target.value)}
                                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none uppercase"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Secondary Color</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={localConfig.design.secondaryColor}
                                                onChange={(e) => handleChange('design', 'secondaryColor', e.target.value)}
                                                className="h-10 w-10 rounded cursor-pointer border-0"
                                            />
                                            <input
                                                type="text"
                                                value={localConfig.design.secondaryColor}
                                                onChange={(e) => handleChange('design', 'secondaryColor', e.target.value)}
                                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none uppercase"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="flex gap-6">
                            {/* Content Sidebar */}
                            <div className="w-48 flex-shrink-0">
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    {contentSections.map(section => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveContentSection(section.id)}
                                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${activeContentSection === section.id ? 'bg-sky-50 text-sky-600 border-l-4 border-sky-500' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                                        >
                                            {section.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 space-y-6">
                                {activeContentSection === 'hero' && (
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                        <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                            <textarea rows="2" value={localConfig.content.hero.title} onChange={(e) => handleContentChange('hero', 'title', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                                            <textarea rows="3" value={localConfig.content.hero.subtitle} onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">CTA Button Text</label>
                                            <input type="text" value={localConfig.content.hero.ctaText} onChange={(e) => handleContentChange('hero', 'ctaText', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Display</label>
                                            <input type="text" value={localConfig.content.hero.phone} onChange={(e) => handleContentChange('hero', 'phone', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                    </div>
                                )}

                                {activeContentSection === 'about' && (
                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                            <h3 className="text-lg font-semibold mb-4">Why Us</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                                    <input type="text" value={localConfig.content.about.whyUs.title} onChange={(e) => handleContentChange('about', 'whyUs', { ...localConfig.content.about.whyUs, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                                                    <input type="text" value={localConfig.content.about.whyUs.subtitle} onChange={(e) => handleContentChange('about', 'whyUs', { ...localConfig.content.about.whyUs, subtitle: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Main Text</label>
                                                    <textarea rows="4" value={localConfig.content.about.whyUs.text} onChange={(e) => handleContentChange('about', 'whyUs', { ...localConfig.content.about.whyUs, text: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeContentSection === 'services' && (
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                                                <input type="text" value={localConfig.content.services.title} onChange={(e) => handleContentChange('services', 'title', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Section Subtitle</label>
                                                <input type="text" value={localConfig.content.services.subtitle} onChange={(e) => handleContentChange('services', 'subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                            </div>
                                            <div className="space-y-4 mt-6">
                                                <h4 className="font-medium text-slate-700">Service List</h4>
                                                {localConfig.content.services.list.map((service, index) => (
                                                    <div key={index} className="p-4 border border-slate-200 rounded-xl space-y-3">
                                                        <div className="flex justify-between items-start">
                                                            <span className="font-medium text-sm text-slate-500">Service #{index + 1}</span>
                                                            <button onClick={() => removeListItem('services', 'list', index)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={service.title}
                                                            onChange={(e) => handleListChange('services', 'list', index, 'title', e.target.value)}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                                            placeholder="Service Title"
                                                        />
                                                        <textarea
                                                            rows="2"
                                                            value={service.description}
                                                            onChange={(e) => handleListChange('services', 'list', index, 'description', e.target.value)}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                                            placeholder="Service Description"
                                                        />
                                                    </div>
                                                ))}
                                                <button onClick={() => addListItem('services', 'list', { title: '', description: '' })} className="w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-sky-500 hover:text-sky-500 transition-colors flex items-center justify-center gap-2">
                                                    <Plus size={20} /> Add Service
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeContentSection === 'faq' && (
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        <h3 className="text-lg font-semibold mb-4">FAQ</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                                                <input type="text" value={localConfig.content.faq.title} onChange={(e) => handleContentChange('faq', 'title', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                            </div>
                                            <div className="space-y-4 mt-6">
                                                {localConfig.content.faq.list.map((item, index) => (
                                                    <div key={index} className="p-4 border border-slate-200 rounded-xl space-y-3">
                                                        <div className="flex justify-between items-start">
                                                            <span className="font-medium text-sm text-slate-500">Question #{index + 1}</span>
                                                            <button onClick={() => removeListItem('faq', 'list', index)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={item.q}
                                                            onChange={(e) => handleListChange('faq', 'list', index, 'q', e.target.value)}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                                            placeholder="Question"
                                                        />
                                                        <textarea
                                                            rows="2"
                                                            value={item.a}
                                                            onChange={(e) => handleListChange('faq', 'list', index, 'a', e.target.value)}
                                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                                            placeholder="Answer"
                                                        />
                                                    </div>
                                                ))}
                                                <button onClick={() => addListItem('faq', 'list', { q: '', a: '' })} className="w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-sky-500 hover:text-sky-500 transition-colors flex items-center justify-center gap-2">
                                                    <Plus size={20} /> Add Question
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeContentSection === 'contact' && (
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                            <input type="text" value={localConfig.content.contact.title} onChange={(e) => handleContentChange('contact', 'title', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                                            <input type="text" value={localConfig.content.contact.subtitle} onChange={(e) => handleContentChange('contact', 'subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                            <input type="text" value={localConfig.content.contact.phone} onChange={(e) => handleContentChange('contact', 'phone', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                            <input type="text" value={localConfig.content.contact.email} onChange={(e) => handleContentChange('contact', 'email', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                            <input type="text" value={localConfig.content.contact.address} onChange={(e) => handleContentChange('contact', 'address', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                    </div>
                                )}

                                {activeContentSection === 'footer' && (
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                        <h3 className="text-lg font-semibold mb-4">Footer</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                            <textarea rows="3" value={localConfig.content.footer.description} onChange={(e) => handleContentChange('footer', 'description', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">License Text</label>
                                            <input type="text" value={localConfig.content.footer.license} onChange={(e) => handleContentChange('footer', 'license', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                    </div>
                                )}

                                {/* Content Save Button */}
                                <div className="pt-4 border-t border-slate-200">
                                    <button onClick={handleSave} className="flex items-center gap-2 bg-sky-600 text-white px-8 py-3 rounded-xl hover:bg-sky-700 transition-colors font-bold shadow-lg shadow-sky-200 ml-auto">
                                        <Save size={20} />
                                        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'puck' && (
                        <div className="fixed inset-0 top-0 left-64 bg-white z-50" style={{ height: '100vh' }}>
                            <GrapesJSEditor />
                        </div>
                    )}

                    {activeTab === 'webhooks' && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-lg font-semibold mb-4">Form Integrations</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Contact Form Webhook URL</label>
                                        <input
                                            type="url"
                                            value={localConfig.webhooks.contactForm}
                                            onChange={(e) => handleChange('webhooks', 'contactForm', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                            placeholder="https://hooks.zapier.com/..."
                                        />
                                        <p className="text-xs text-slate-500 mt-1">This URL will receive a POST request with the form data (JSON) upon successful submission.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
