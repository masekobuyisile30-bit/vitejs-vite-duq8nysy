import { useState, useEffect, useCallback } from 'react'
import { Sparkles, ArrowRight, Zap, Palette, Layout, MessageCircle, Send, CheckCircle2, Layers, TrendingUp, Smile, Gauge, ChevronRight, ChevronLeft, Quote } from 'lucide-react'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [polished, setPolished] = useState(false)
  const [activeScenario, setActiveScenario] = useState<any>(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scenarios = [
    { id: 'onboarding', label: 'Onboarding is Slow', problem: 'Manual data entry creates friction.', steps: [{ icon: <Layers size={20} />, title: 'Unified Intake', description: 'A single elegant portal consolidates all client data.' },{ icon: <Zap size={20} />, title: 'AI Verification', description: 'Intelligent workflows auto-verify information.' }] },
    { id: 'reports', label: 'Reports Need Modernizing', problem: 'Static PDFs fail to impress stakeholders.', steps: [{ icon: <Palette size={20} />, title: 'Design Refresh', description: 'We craft a bespoke visual system.' },{ icon: <TrendingUp size={20} />, title: 'Real-Time Data', description: 'Live feeds replace stale exports.' }] },
    { id: 'ux', label: 'Tools Feel Clunky', problem: 'Legacy interfaces slow down your team.', steps: [{ icon: <Gauge size={20} />, title: 'Performance Audit', description: 'We map friction points.' },{ icon: <Sparkles size={20} />, title: 'Fluid Redesign', description: 'Every screen is re-imagined.' }] },
  ]

  const testimonials = [
    { quote: 'Aethel made our workflow a pleasure to use. Efficiency jumped 40%.', author: 'Elena Vasquez', role: 'COO, Lumina Health', metric: '40% efficiency gain' },
    { quote: 'The transformation of our reporting suite won us a major client.', author: 'Marcus Chen', role: 'MD, Apex Capital', metric: '3 major accounts won' },
  ]

  const nextTestimonial = useCallback(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), [testimonials.length])
  const prevTestimonial = useCallback(() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length), [testimonials.length])
  
  useEffect(() => { const t = setInterval(nextTestimonial, 5000); return () => clearInterval(t) }, [nextTestimonial])
  const tm = testimonials[currentTestimonial]

  const handleScenarioClick = (scenario: any) => {
    setActiveScenario(scenario)
    setChatMessages([{ text: scenario.problem, isUser: true }, { text: '✨ Here is your tailored transformation plan.', isUser: false }])
  }

  const handleCustomSend = () => {
    if (!customPrompt.trim()) return
    setChatMessages([...chatMessages, { text: customPrompt, isUser: true }, { text: 'I have analysed your request. A bespoke blueprint will be ready soon.', isUser: false }])
    setCustomPrompt('')
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800">
      <nav className={`fixed inset-x-0 top-4 z-50 mx-auto max-w-7xl transition-all duration-500 ${scrolled ? 'bg-white/80 shadow-lg backdrop-blur-xl' : 'bg-transparent'} rounded-3xl border border-white/60 px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md"><Sparkles size={20} /></div>
            <span className="text-xl font-semibold tracking-tight text-slate-800">Aethel</span>
          </div>
          <div className="hidden items-center gap-10 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="hover:text-teal-700">Services</a>
            <a href="#assistant" className="hover:text-teal-700">Concierge</a>
          </div>
          <button className="rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg flex items-center gap-2">Elevate Now <ArrowRight size={16} /></button>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase text-teal-700">Welcome to Elegance</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl lg:text-6xl">Transform workflows into <span className="text-teal-600">fluid experiences</span></h1>
            <p className="mt-6 text-lg text-slate-500">Aethel polishes every operational touchpoint so your business moves with grace and precision.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl flex items-center gap-2">Explore Services <ArrowRight size={18} /></button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
            <div className="flex justify-between border-b px-5 py-3"><span className="text-xs font-semibold text-slate-400">{polished ? 'Polished' : 'Wireframe'}</span><div className="flex gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"/><span className="w-2.5 h-2.5 rounded-full bg-slate-300"/></div></div>
            <div className="min-h-[240px] bg-slate-50 p-6 flex items-center justify-center">
              {!polished ? (
                <div className="w-full space-y-4"><div className="h-8 w-1/3 bg-slate-300 rounded"/><div className="h-20 w-full border-2 border-dashed border-slate-300 bg-slate-100 rounded-lg"/><div className="h-6 w-4/5 bg-slate-200 rounded"/></div>
              ) : (
                <div className="w-full space-y-4"><div className="flex justify-between items-center"><div><div className="text-lg font-bold text-slate-800">Weekly flow</div><div className="text-xs text-teal-600">+18.2% efficiency</div></div><Zap className="text-teal-600"/></div><div className="grid grid-cols-2 gap-3"><div className="bg-teal-50 p-3 rounded-xl"><div className="text-xs text-teal-700">Tasks</div><div className="text-2xl font-bold text-teal-800">24</div></div><div className="bg-amber-50 p-3 rounded-xl"><div className="text-xs text-amber-700">Done</div><div className="text-2xl font-bold text-amber-800">142</div></div></div></div>
              )}
            </div>
            <div className="p-4 border-t"><button onClick={() => setPolished(!polished)} className={`w-full py-3 rounded-xl text-sm font-semibold ${polished ? 'bg-slate-100 text-slate-600' : 'bg-teal-600 text-white'}`}>{polished ? 'Reset' : '✨ Polish Workflow'}</button></div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center mb-16">
          <h2 className="text-3xl font-semibold text-slate-900">Core Transformation Services</h2>
        </div>
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-8">
          {[{ icon: <Palette size={28} />, title: 'Elegant Design', desc: 'We map workflows into refined journeys.' },{ icon: <Zap size={28} />, title: 'AI Efficiency', desc: 'Intelligent automations woven seamlessly.' },{ icon: <Layout size={28} />, title: 'Fluid UX', desc: 'Interfaces that feel effortless.' }].map((s, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform"><div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-5">{s.icon}</div><h3 className="text-xl font-semibold text-slate-800 mb-3">{s.title}</h3><p className="text-slate-500 text-sm">{s.desc}</p></div>
          ))}
        </div>
      </section>

      <section id="assistant" className="py-24 bg-stone-100">
        <div className="mx-auto max-w-4xl px-6 bg-white/70 backdrop-blur rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6"><MessageCircle className="text-teal-600"/><h3 className="text-xl font-semibold">Aethel Assistant</h3></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">{scenarios.map(s => <button key={s.id} onClick={() => handleScenarioClick(s)} className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 text-sm hover:bg-teal-50">{s.label}</button>)}</div>
            <div className="md:col-span-2 flex flex-col">
              <div className="flex-1 bg-slate-50 rounded-2xl p-5 space-y-4 min-h-[220px]">
                {chatMessages.length === 0 ? <p className="text-sm text-slate-400">Select a scenario...</p> : chatMessages.map((m, i) => <div key={i} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}><div className={`px-4 py-3 rounded-2xl text-sm ${m.isUser ? 'bg-teal-600 text-white' : 'bg-white border text-slate-700'}`}>{m.text}</div></div>)}
                {activeScenario && <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">{activeScenario.steps.map((st: any, i: number) => <div key={i} className="flex gap-3"><div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">{st.icon}</div><div><p className="font-semibold text-slate-800 text-sm">{st.title}</p><p className="text-xs text-slate-500">{st.description}</p></div></div>)}</div>}
              </div>
              <div className="flex gap-2 mt-4"><input value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} placeholder="Describe your challenge..." className="flex-1 bg-white border rounded-xl px-4 py-3 text-sm outline-none" onKeyDown={e => e.key === 'Enter' && handleCustomSend()}/><button onClick={handleCustomSend} className="bg-teal-600 text-white p-3 rounded-xl"><Send size={18}/></button></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}