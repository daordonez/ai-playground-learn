import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { api } from "./lib/api";
import { allEditorial } from "./lib/editorial";
import { lessonFor, lessonsFor } from "./lib/content";
import type { LessonResource, Locale, Profile } from "./types";

const labels = {
  es: { home: "Inicio", path: "Ruta", architecture: "Arquitectura", glossary: "Glosario", progress: "Progreso", editorial: "Editorial", learn: "Empieza la ruta", next: "Siguiente lección", complete: "Marcar como completada", undo: "Marcar pendiente", objectives: "Al terminar podrás", prerequisites: "Antes de empezar", progressTitle: "Tu avance", lessons: "lecciones completadas", fallback: "La versión en inglés aún está en revisión. Mostramos el contenido en español.", role: "Modo editor local", subtitle: "De SRE a full stack, una lección práctica cada vez.", continue: "Continuar" },
  en: { home: "Home", path: "Learning path", architecture: "Architecture", glossary: "Glossary", progress: "Progress", editorial: "Editorial", learn: "Start the path", next: "Next lesson", complete: "Mark as complete", undo: "Mark as pending", objectives: "By the end you will be able to", prerequisites: "Before you start", progressTitle: "Your progress", lessons: "completed lessons", fallback: "The English version is still under review. Spanish content is shown.", role: "Local editor mode", subtitle: "From SRE to full stack, one practical lesson at a time.", continue: "Continue" },
} as const;

function App() {
  const [profile, setProfile] = useState<Profile>({ role: "editor", preferred_locale: "es" });
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getProgress()])
      .then(([loadedProfile, loadedProgress]) => { setProfile(loadedProfile); setProgress(loadedProgress.items); })
      .finally(() => setReady(true));
  }, []);

  const locale = profile.preferred_locale;
  const changeLocale = async (next: Locale) => setProfile(await api.updateLocale(next));
  const toggleProgress = async (id: string) => {
    const result = await api.updateProgress(id, !progress[id]);
    setProgress(result.items);
  };
  if (!ready) return <main className="loading">Cargando plataforma…</main>;
  return <Shell locale={locale} changeLocale={changeLocale} profile={profile} progress={progress} toggleProgress={toggleProgress} />;
}

function Shell({ locale, changeLocale, profile, progress, toggleProgress }: { locale: Locale; changeLocale: (locale: Locale) => Promise<void>; profile: Profile; progress: Record<string, boolean>; toggleProgress: (id: string) => Promise<void> }) {
  const t = labels[locale];
  const lessons = lessonsFor(locale);
  const completed = lessons.filter((lesson) => progress[lesson.id]).length;
  return <div className="app-shell">
    <aside className="sidebar">
      <Link className="brand" to="/"><span>◈</span> AI Playground <em>Learn</em></Link>
      <p className="tagline">{t.subtitle}</p>
      <nav>
        <NavLink to="/">{t.home}</NavLink><NavLink to="/path">{t.path}</NavLink><NavLink to="/architecture">{t.architecture}</NavLink><NavLink to="/glossary">{t.glossary}</NavLink><NavLink to="/progress">{t.progress}</NavLink>
        {profile.role === "editor" && <NavLink to="/editorial">{t.editorial}</NavLink>}
      </nav>
      <div className="progress-card"><strong>{t.progressTitle}</strong><span>{completed}/{lessons.length} {t.lessons}</span><div className="progress-bar"><i style={{ width: `${(completed / lessons.length) * 100}%` }} /></div></div>
      <div className="locale"><button className={locale === "es" ? "active" : ""} onClick={() => changeLocale("es")}>ES</button><button className={locale === "en" ? "active" : ""} onClick={() => changeLocale("en")}>EN</button></div>
      <small>✦ {t.role}</small>
    </aside>
    <main className="main"><Routes>
      <Route path="/" element={<Home locale={locale} progress={progress} />} />
      <Route path="/path" element={<Path locale={locale} progress={progress} />} />
      <Route path="/lesson/:id" element={<LessonPage locale={locale} progress={progress} toggleProgress={toggleProgress} />} />
      <Route path="/architecture" element={<Architecture locale={locale} />} />
      <Route path="/glossary" element={<Glossary locale={locale} />} />
      <Route path="/progress" element={<Progress locale={locale} progress={progress} />} />
      <Route path="/editorial" element={profile.role === "editor" ? <Editorial /> : <Home locale={locale} progress={progress} />} />
    </Routes></main>
  </div>;
}

function Home({ locale, progress }: { locale: Locale; progress: Record<string, boolean> }) {
  const t = labels[locale]; const lessons = lessonsFor(locale); const next = lessons.find((lesson) => !progress[lesson.id]) ?? lessons[0];
  return <><section className="hero"><p className="eyebrow">{locale === "es" ? "RUTA PRÁCTICA DE 12 MÓDULOS" : "12-MODULE PRACTICAL PATH"}</p><h1>{locale === "es" ? "Construye el playground que te habría gustado encontrar." : "Build the playground you wish you had found."}</h1><p>{locale === "es" ? "Una transición estructurada desde infraestructura hacia producto: código, APIs, IA, contenedores y entrega continua." : "A structured transition from infrastructure to product: code, APIs, AI, containers, and continuous delivery."}</p><Link className="button" to={`/lesson/${next.id}`}>{t.continue} →</Link></section><section className="grid three"><Stat value="12" label={locale === "es" ? "módulos conectados" : "connected modules"}/><Stat value="2" label={locale === "es" ? "idiomas para aprender" : "learning languages"}/><Stat value="2" label={locale === "es" ? "formatos de vídeo" : "video formats"}/></section><section><h2>{locale === "es" ? "Tu siguiente paso" : "Your next step"}</h2><LessonCard lesson={next} done={Boolean(progress[next.id])} /></section></>;
}
function Stat({ value, label }: { value: string; label: string }) { return <article className="stat"><strong>{value}</strong><span>{label}</span></article>; }
function Path({ locale, progress }: { locale: Locale; progress: Record<string, boolean> }) { const lessons = lessonsFor(locale); return <section><p className="eyebrow">{labels[locale].path}</p><h1>{locale === "es" ? "Del homelab al MVP" : "From homelab to MVP"}</h1><div className="lesson-list">{lessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} done={Boolean(progress[lesson.id])} />)}</div></section>; }
function LessonCard({ lesson, done }: { lesson: ReturnType<typeof lessonsFor>[number]; done: boolean }) { return <Link className="lesson-card" to={`/lesson/${lesson.id}`}><span className={done ? "lesson-number done" : "lesson-number"}>{done ? "✓" : lesson.order}</span><div><small>M{lesson.module} · {lesson.duration}</small><h3>{lesson.title}</h3><p>{lesson.objectives[0]}</p></div><b>→</b></Link>; }
function LessonPage({ locale, progress, toggleProgress }: { locale: Locale; progress: Record<string, boolean>; toggleProgress: (id: string) => Promise<void> }) {
  const { id = "" } = useParams(); const requested = lessonFor(locale, id); const lesson = requested?.translationStatus === "published" ? requested : lessonFor("es", id); const t = labels[locale];
  if (!lesson) return <section><h1>404</h1></section>;
  const lessons = lessonsFor(locale); const next = lessons.find((item) => item.order === lesson.order + 1);
  return <article className="lesson"><p className="eyebrow">MÓDULO {lesson.module} · {lesson.duration}</p><h1>{lesson.title}</h1>{requested?.translationStatus !== "published" && <p className="notice">{t.fallback}</p>}<div className="lesson-meta"><div><h3>{t.prerequisites}</h3><p>{lesson.prerequisites.join(" · ")}</p></div><div><h3>{t.objectives}</h3><ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div></div><ReactMarkdown>{lesson.body}</ReactMarkdown><LessonResources resources={lesson.resources} locale={locale} /><div className="lesson-actions"><button className={progress[id] ? "button secondary" : "button"} onClick={() => toggleProgress(id)}>{progress[id] ? t.undo : t.complete}</button>{next && <Link className="text-link" to={`/lesson/${next.id}`}>{t.next} →</Link>}</div></article>;
}
function LessonResources({ resources, locale }: { resources: LessonResource[]; locale: Locale }) {
  const labels = locale === "es" ? { title: "Recursos para profundizar", official: "Documentación oficial", video: "Vídeo curado" } : { title: "Resources to go deeper", official: "Official documentation", video: "Curated video" };
  return <details className="lesson-resources"><summary>{labels.title}</summary><div>{resources.map((resource) => <a key={resource.url} className="resource-card" href={resource.url} target="_blank" rel="noopener noreferrer"><span>{resource.type === "official_docs" ? labels.official : labels.video}</span><strong>{resource.title}</strong><p>{resource.description}</p><small>{resource.provider} ↗</small></a>)}</div></details>;
}
function Architecture({ locale }: { locale: Locale }) { return <section><p className="eyebrow">{labels[locale].architecture}</p><h1>{locale === "es" ? "Una plataforma simple, con evolución clara." : "A simple platform with a clear evolution path."}</h1><div className="architecture"><div>React + Vite<br/><small>SPA bilingüe</small></div><i>↓</i><div>FastAPI<br/><small>API, perfil, progreso</small></div><i>↓</i><div>SQLite<br/><small>Volumen persistente</small></div><i>→</i><div>Dokploy<br/><small>GHCR · TLS · deploy</small></div></div><h2>{locale === "es" ? "Límite de responsabilidad" : "Responsibility boundary"}</h2><p>{locale === "es" ? "El navegador no conoce secretos de Azure. El futuro playground hablará solo con FastAPI; FastAPI centralizará OIDC, autorización y Azure Foundry." : "The browser never sees Azure secrets. The future playground speaks only to FastAPI; FastAPI centralizes OIDC, authorization, and Azure Foundry."}</p></section>; }
function Glossary({ locale }: { locale: Locale }) { const terms = locale === "es" ? [["SPA", "Aplicación web que cambia de vista sin recargar toda la página."], ["OIDC", "Protocolo de identidad intercambiable para Keycloak y Entra ID."], ["SSE", "Canal HTTP unidireccional para mostrar texto generado en streaming."], ["GHCR", "Registro de imágenes de contenedor integrado en GitHub."]] : [["SPA", "A web application that changes views without reloading the whole page."], ["OIDC", "Interchangeable identity protocol for Keycloak and Entra ID."], ["SSE", "One-way HTTP channel used to display generated text as a stream."], ["GHCR", "GitHub-integrated container image registry."]]; return <section><p className="eyebrow">{labels[locale].glossary}</p><h1>{locale === "es" ? "Conceptos que usarás en la ruta" : "Concepts used throughout the path"}</h1><dl className="glossary">{terms.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>; }
function Progress({ locale, progress }: { locale: Locale; progress: Record<string, boolean> }) { const lessons = lessonsFor(locale); const completed = lessons.filter((lesson) => progress[lesson.id]); return <section><p className="eyebrow">{labels[locale].progress}</p><h1>{completed.length}/{lessons.length}</h1><p>{locale === "es" ? "El progreso se guarda en el volumen persistente de la aplicación." : "Progress is saved in the application's persistent volume."}</p><div className="lesson-list">{completed.length ? completed.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} done />) : <p>{locale === "es" ? "Aún no has completado ninguna lección." : "You have not completed a lesson yet."}</p>}</div></section>; }
function Editorial() { const editorials = useMemo(allEditorial, []); return <section className="editorial"><p className="eyebrow">ÁREA EDITORIAL · SOLO ESPAÑOL</p><h1>Guiones y sugerencias audiovisuales</h1><p>Estos materiales son una guía de producción: muestran qué enseñar, qué señalar y cómo reducir cada lección para vídeo. No son un editor de vídeo.</p>{editorials.map(({ id, body }) => <article key={id} className="editorial-card"><ReactMarkdown>{body}</ReactMarkdown></article>)}</section>; }
export default App;
