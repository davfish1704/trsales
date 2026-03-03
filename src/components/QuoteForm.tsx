import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Globe, Smartphone, TrendingUp, 
  ChevronLeft, ChevronRight, Check, Loader2,
  Calendar, Database, Filter, Settings,
  FileText, Video, Users, Code,
  CreditCard, Clock,
  Search, Facebook, Linkedin, Music2,
  Target, ShoppingCart, Eye,
  Building2, MessageSquare, Phone, Mail
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type Category = 'automation' | 'websites' | 'digital' | 'ads' | null;
type Step = 1 | 2 | 3 | 4 | 5;

interface FormData {
  category: Category;
  // Automation
  automationType: string;
  automationOther: string;
  // Websites
  websiteBackend: string;
  websitePages: string;
  websiteDesign: string;
  websiteFeatures: string[];
  // Digital Products
  digitalType: string;
  digitalPlatform: string;
  digitalPayment: string;
  digitalDelivery: string;
  // Ads
  adsPlatform: string;
  adsGoal: string;
  adsBudget: string;
  adsCreative: string;
  // Project
  niche: string;
  problem: string;
  timeline: string;
  budget: string;
  // Contact
  name: string;
  email: string;
  company: string;
  phone: string;
  preferredContact: string;
}

const initialFormData: FormData = {
  category: null,
  automationType: '',
  automationOther: '',
  websiteBackend: '',
  websitePages: '',
  websiteDesign: '',
  websiteFeatures: [],
  digitalType: '',
  digitalPlatform: '',
  digitalPayment: '',
  digitalDelivery: '',
  adsPlatform: '',
  adsGoal: '',
  adsBudget: '',
  adsCreative: '',
  niche: '',
  problem: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  company: '',
  phone: '',
  preferredContact: 'email',
};

const categoryIcons = {
  automation: Bot,
  websites: Globe,
  digital: Smartphone,
  ads: TrendingUp,
};

export function QuoteForm() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (key: keyof FormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => { const newErrors = { ...prev }; delete newErrors[key]; return newErrors; });
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && !formData.category) {
      newErrors.category = t('quote.errors.selectCategory');
    }

    if (step === 2) {
      if (formData.category === 'automation' && !formData.automationType) {
        newErrors.automationType = t('quote.errors.required');
      }
      if (formData.category === 'websites') {
        if (!formData.websiteBackend) newErrors.websiteBackend = t('quote.errors.required');
        if (!formData.websitePages) newErrors.websitePages = t('quote.errors.required');
        if (!formData.websiteDesign) newErrors.websiteDesign = t('quote.errors.required');
      }
      if (formData.category === 'digital') {
        if (!formData.digitalType) newErrors.digitalType = t('quote.errors.required');
        if (!formData.digitalPlatform) newErrors.digitalPlatform = t('quote.errors.required');
      }
      if (formData.category === 'ads') {
        if (!formData.adsPlatform) newErrors.adsPlatform = t('quote.errors.required');
        if (!formData.adsGoal) newErrors.adsGoal = t('quote.errors.required');
      }
    }

    if (step === 3) {
      if (!formData.niche) newErrors.niche = t('quote.errors.required');
      if (!formData.timeline) newErrors.timeline = t('quote.errors.required');
      if (!formData.budget) newErrors.budget = t('quote.errors.required');
    }

    if (step === 4) {
      if (!formData.name) newErrors.name = t('quote.errors.required');
      if (!formData.email) {
        newErrors.email = t('quote.errors.required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('quote.errors.email');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep() && step < 4) {
      setStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In production, this would send to your API
    console.log('Form submitted:', formData);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectCategory = (category: Category) => {
    updateFormData('category', category);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto section-padding">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="heading-md text-navy mb-4">
              {t('quote.success.title')}
            </h2>
            <p className="body-md mb-8">
              {t('quote.success.message')}
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              {t('quote.success.cta')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="heading-lg text-navy mb-4">
            {t('quote.title')}
          </h1>
          <p className="body-lg">
            {t('quote.subtitle')}
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  s <= step
                    ? 'bg-gold text-navy'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? <Check size={16} /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-12 h-0.5 mx-1 ${
                    s < step ? 'bg-gold' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div className="p-6 md:p-10">
              <h2 className="heading-md text-navy mb-6">
                {t('quote.steps.category')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(Object.keys(categoryIcons) as Array<'automation' | 'websites' | 'digital' | 'ads'>).map((cat) => {
                  const Icon = categoryIcons[cat];
                  const isSelected = formData.category === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => selectCategory(cat)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 mb-3 ${
                          isSelected ? 'text-gold' : 'text-gray-400'
                        }`}
                      />
                      <h3 className="font-semibold text-navy mb-1">
                        {(t(`quote.categories.${cat}.title`))}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {(t(`quote.categories.${cat}.description`))}
                      </p>
                    </button>
                  );
                })}
              </div>
              {errors.category && (
                <p className="text-red-500 text-sm mt-4">{errors.category}</p>
              )}
            </div>
          )}

          {/* Step 2: Category Details */}
          {step === 2 && formData.category === 'automation' && (
            <div className="p-6 md:p-10">
              <h2 className="heading-md text-navy mb-6">
                {t('quote.automation.title')}
              </h2>
              <div className="space-y-3">
                {['lead', 'crm', 'calendar', 'funnel', 'other'].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.automationType === type
                        ? 'border-gold bg-gold/5'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="automationType"
                      value={type}
                      checked={formData.automationType === type}
                      onChange={(e) => updateFormData('automationType', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-navy">
                        {(t(`quote.automation.options.${type}`))}
                      </span>
                    </div>
                    {type === 'lead' && <Filter className="w-5 h-5 text-gray-400" />}
                    {type === 'crm' && <Database className="w-5 h-5 text-gray-400" />}
                    {type === 'calendar' && <Calendar className="w-5 h-5 text-gray-400" />}
                    {type === 'funnel' && <Settings className="w-5 h-5 text-gray-400" />}
                    {type === 'other' && <MessageSquare className="w-5 h-5 text-gray-400" />}
                  </label>
                ))}
              </div>
              {formData.automationType === 'other' && (
                <div className="mt-4">
                  <textarea
                    value={formData.automationOther}
                    onChange={(e) => updateFormData('automationOther', e.target.value)}
                    placeholder={t('quote.automation.otherPlaceholder')}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none"
                    rows={3}
                  />
                </div>
              )}
              {errors.automationType && (
                <p className="text-red-500 text-sm mt-4">{errors.automationType}</p>
              )}
            </div>
          )}

          {step === 2 && formData.category === 'websites' && (
            <div className="p-6 md:p-10 space-y-6">
              <h2 className="heading-md text-navy mb-6">
                {t('quote.websites.title')}
              </h2>
              
              {/* Backend */}
              <div>
                <label className="block font-medium text-navy mb-3">
                  {t('quote.websites.backend.label')}
                </label>
                <div className="flex gap-4">
                  {['yes', 'no'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.websiteBackend === opt
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="websiteBackend"
                        value={opt}
                        checked={formData.websiteBackend === opt}
                        onChange={(e) => updateFormData('websiteBackend', e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-navy">
                        {(t(`quote.websites.backend.${opt}`))}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.websiteBackend && (
                  <p className="text-red-500 text-sm mt-2">{errors.websiteBackend}</p>
                )}
              </div>

              {/* Pages */}
              <div>
                <label className="block font-medium text-navy mb-3">
                  {t('quote.websites.pages.label')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['1-3', '4-6', '7-10', '10+'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.websitePages === opt
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="websitePages"
                        value={opt}
                        checked={formData.websitePages === opt}
                        onChange={(e) => updateFormData('websitePages', e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-navy">
                        {(t(`quote.websites.pages.${opt}`))}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.websitePages && (
                  <p className="text-red-500 text-sm mt-2">{errors.websitePages}</p>
                )}
              </div>

              {/* Design */}
              <div>
                <label className="block font-medium text-navy mb-3">
                  {t('quote.websites.design.label')}
                </label>
                <div className="space-y-2">
                  {['template', 'custom', 'premium'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.websiteDesign === opt
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="websiteDesign"
                        value={opt}
                        checked={formData.websiteDesign === opt}
                        onChange={(e) => updateFormData('websiteDesign', e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-navy">
                        {(t(`quote.websites.design.${opt}`))}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.websiteDesign && (
                  <p className="text-red-500 text-sm mt-2">{errors.websiteDesign}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && formData.category === 'digital' && (
            <div className="p-6 md:p-10 space-y-6">
              <h2 className="heading-md text-navy mb-6">
                {t('quote.digital.title')}
              </h2>
              
              {/* Type */}
              <div>
                <label className="block font-medium text-navy mb-3">
                  {t('quote.digital.type.label')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['ebook', 'course', 'membership', 'software'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.digitalType === opt
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="digitalType"
                        value={opt}
                        checked={formData.digitalType === opt}
                        onChange={(e) => updateFormData('digitalType', e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-navy">
                        {(t(`quote.digital.type.${opt}`))}
                      </span>
                      {opt === 'ebook' && <FileText className="w-5 h-5 ml-auto text-gray-400" />}
                      {opt === 'course' && <Video className="w-5 h-5 ml-auto text-gray-400" />}
                      {opt === 'membership' && <Users className="w-5 h-5 ml-auto text-gray-400" />}
                      {opt === 'software' && <Code className="w-5 h-5 ml-auto text-gray-400" />}
                    </label>
                  ))}
                </div>
                {errors.digitalType && (
                  <p className="text-red-500 text-sm mt-2">{errors.digitalType}</p>
                )}
              </div>

              {/* Platform */}
              <div>
                <label className="block font-medium text-navy mb-3">
                  {t('quote.digital.platform.label')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['teachable', 'kajabi', 'custom', 'unsure'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.digitalPlatform === opt
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="digitalPlatform"
                        value={opt}
                        checked={formData.digitalPlatform === opt}
                        onChange={(e) => updateFormData('digitalPlatform', e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-navy">
                        {(t(`quote.digital.platform.${opt}`))}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.digitalPlatform && (
                  <p className="text-red-500 text-sm mt-2">{errors.digitalPlatform}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && formData.category === 'ads' && (
            <div className="p-6 md:p-10 space-y-6">
              <h2 className="heading-md text-navy mb-6">
                {t('quote.ads.title')}
              </h2>
              
              {/* Platform */}
              <div>
                <label className="block font-medium text-navy mb-3">
                  {t('quote.ads.platform.label')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['google', 'meta', 'linkedin', 'tiktok', 'multi'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.adsPlatform === opt
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="adsPlatform"
                        value={opt}
                        checked={formData.adsPlatform === opt}
                        onChange={(e) => updateFormData('adsPlatform', e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-navy">
                        {(t(`quote.ads.platform.${opt}`))}
                      </span>
                      {opt === 'google' && <Search className="w-5 h-5 ml-auto text-gray-400" />}
                      {opt === 'meta' && <Facebook className="w-5 h-5 ml-auto text-gray-400" />}
                      {opt === 'linkedin' && <Linkedin className="w-5 h-5 ml-auto text-gray-400" />}
                      {opt === 'tiktok' && <Music2 className="w-5 h-5 ml-auto text-gray-400" />}
                    </label>
                  ))}
                </div>
                {errors.adsPlatform && (
                  <p className="text-red-500 text-sm mt-2">{errors.adsPlatform}</p>
                )}
              </div>

              {/* Goal */}
              <div>
                <label className="block font-medium text-navy mb-3">
                  {t('quote.ads.goal.label')}
                </label>
                <div className="space-y-2">
                  {['leads', 'sales', 'awareness'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.adsGoal === opt
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="adsGoal"
                        value={opt}
                        checked={formData.adsGoal === opt}
                        onChange={(e) => updateFormData('adsGoal', e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-navy">
                        {(t(`quote.ads.goal.${opt}`))}
                      </span>
                      {opt === 'leads' && <Target className="w-5 h-5 ml-auto text-gray-400" />}
                      {opt === 'sales' && <ShoppingCart className="w-5 h-5 ml-auto text-gray-400" />}
                      {opt === 'awareness' && <Eye className="w-5 h-5 ml-auto text-gray-400" />}
                    </label>
                  ))}
                </div>
                {errors.adsGoal && (
                  <p className="text-red-500 text-sm mt-2">{errors.adsGoal}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Project Details */}
          {step === 3 && (
            <div className="p-6 md:p-10 space-y-6">
              <h2 className="heading-md text-navy mb-6">
                {t('quote.project.title')}
              </h2>

              {/* Niche */}
              <div>
                <label className="block font-medium text-navy mb-2">
                  {t('quote.project.niche.label')}
                </label>
                <input
                  type="text"
                  value={formData.niche}
                  onChange={(e) => updateFormData('niche', e.target.value)}
                  placeholder={t('quote.project.niche.placeholder')}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                />
                {errors.niche && (
                  <p className="text-red-500 text-sm mt-2">{errors.niche}</p>
                )}
              </div>

              {/* Problem */}
              <div>
                <label className="block font-medium text-navy mb-2">
                  {t('quote.project.problem.label')}
                </label>
                <textarea
                  value={formData.problem}
                  onChange={(e) => updateFormData('problem', e.target.value)}
                  placeholder={t('quote.project.problem.placeholder')}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none"
                  rows={4}
                />
              </div>

              {/* Timeline */}
              <div>
                <label className="block font-medium text-navy mb-3">
                  {t('quote.project.timeline.label')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['asap', '2weeks', '1month', 'flexible'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.timeline === opt
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={opt}
                        checked={formData.timeline === opt}
                        onChange={(e) => updateFormData('timeline', e.target.value)}
                        className="sr-only"
                      />
                      <Clock className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium text-navy">
                        {(t(`quote.project.timeline.${opt}`))}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.timeline && (
                  <p className="text-red-500 text-sm mt-2">{errors.timeline}</p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label className="block font-medium text-navy mb-3">
                  {t('quote.project.budget.label')}
                </label>
                <div className="space-y-2">
                  {['500-1k', '1k-3k', '3k-5k', '5k-10k', '10k+'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.budget === opt
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={opt}
                        checked={formData.budget === opt}
                        onChange={(e) => updateFormData('budget', e.target.value)}
                        className="sr-only"
                      />
                      <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium text-navy">
                        {(t(`quote.project.budget.${opt}`))}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-2">{errors.budget}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div className="p-6 md:p-10 space-y-6">
              <h2 className="heading-md text-navy mb-6">
                {t('quote.contact.title')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block font-medium text-navy mb-2">
                    {t('quote.contact.name.label')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder={t('quote.contact.name.placeholder')}
                      className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                    />
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block font-medium text-navy mb-2">
                    {t('quote.contact.email.label')}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder={t('quote.contact.email.placeholder')}
                      className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block font-medium text-navy mb-2">
                    {t('quote.contact.company.label')}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateFormData('company', e.target.value)}
                    placeholder={t('quote.contact.company.placeholder')}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-medium text-navy mb-2">
                    {t('quote.contact.phone.label')}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder={t('quote.contact.phone.placeholder')}
                      className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Preferred Contact */}
                <div className="md:col-span-2">
                  <label className="block font-medium text-navy mb-3">
                    {t('quote.contact.preferred.label')}
                  </label>
                  <div className="flex gap-3">
                    {['email', 'whatsapp', 'call'].map((opt) => (
                      <label
                        key={opt}
                        className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.preferredContact === opt
                            ? 'border-gold bg-gold/5'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value={opt}
                          checked={formData.preferredContact === opt}
                          onChange={(e) => updateFormData('preferredContact', e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium text-navy">
                          {(t(`quote.contact.preferred.${opt}`))}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="p-6 md:p-10 border-t border-gray-100 flex justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 text-navy font-medium hover:text-gold transition-colors"
              >
                <ChevronLeft size={20} />
                {t('quote.buttons.back')}
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2"
              >
                {t('quote.buttons.next')}
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {t('quote.buttons.sending')}
                  </>
                ) : (
                  <>
                    {t('quote.buttons.submit')}
                    <Check size={20} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
