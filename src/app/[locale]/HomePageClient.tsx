"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Check,
  ChevronDown,
  Cpu,
  ExternalLink,
  Gamepad2,
  Gift,
  Hand,
  HardDrive,
  Keyboard,
  Languages,
  Map,
  Monitor,
  Package,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.heaveho2.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Heave Ho 2 Wiki",
        description:
          "Complete Heave Ho 2 Wiki covering all 72 co-op levels, eight worlds, controls, online and local multiplayer, versus modes, unlockables, and achievements.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Heave Ho 2 - Chaotic 2-4 Player Physics Co-op",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Heave Ho 2 Wiki",
        alternateName: "Heave Ho 2",
        url: siteUrl,
        description:
          "Complete Heave Ho 2 Wiki resource hub for levels, worlds, controls, co-op, versus, unlockables, and updates",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Heave Ho 2 Wiki - Chaotic Physics Co-op Party Game",
        },
        sameAs: [
          "https://store.steampowered.com/app/2802740/Heave_Ho_2/",
          "https://discord.com/invite/devolverdigital",
          "https://www.reddit.com/r/HeaveHo/",
          "https://www.youtube.com/@DevolverDigital",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Heave Ho 2",
        gamePlatform: ["PC", "Steam", "Nintendo Switch", "Nintendo Switch 2"],
        applicationCategory: "Game",
        genre: ["Co-op", "Party", "Physics", "Platformer"],
        numberOfPlayers: {
          minValue: 2,
          maxValue: 4,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://store.steampowered.com/app/2802740/Heave_Ho_2/",
        },
      },
      {
        "@type": "VideoObject",
        name: "Heave Ho 2 | Reveal Trailer",
        description:
          "Official Heave Ho 2 reveal trailer from Devolver Digital, showcasing chaotic 2-4 player physics co-op across eight themed worlds.",
        uploadDate: "2026-07-16",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/QwAOjls4vbA",
        url: "https://www.youtube.com/watch?v=QwAOjls4vbA",
      },
    ],
  };

  // World accordion state
  const [worldExpanded, setWorldExpanded] = useState<number | null>(0);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const m = t.modules;
  const platformIcons = [Monitor, Gamepad2, Gamepad2];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("tools-grid")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://store.steampowered.com/app/2802740/Heave_Ho_2/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="QwAOjls4vbA"
              title="Heave Ho 2 | Reveal Trailer"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards */}
      <section id="tools-grid" className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionIds = [
                "release-date-price-platforms",
                "beginner-guide",
                "controls-swinging-guide",
                "multiplayer-co-op-guide",
                "walkthrough-and-world-guide",
                "items-unlocks-and-cosmetics",
                "achievements-guide",
                "system-requirements-and-pc-settings",
              ];
              const sectionId = sectionIds[index];

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Release Date, Price and Platforms */}
      <section id="release-date-price-platforms" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-2">
              {m.heaveHo2ReleaseDatePricePlatforms.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {m.heaveHo2ReleaseDatePricePlatforms.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {m.heaveHo2ReleaseDatePricePlatforms.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {m.heaveHo2ReleaseDatePricePlatforms.platforms.map((p: any, index: number) => {
              const PlatformIcon = platformIcons[index] || Gamepad2;
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                      <PlatformIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{p.name}</h3>
                      <span className="text-xs text-muted-foreground">{p.store}</span>
                    </div>
                  </div>

                  <dl className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <dt className="text-muted-foreground">Release:</dt>
                      <dd className="font-medium">{p.releaseDate}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <dt className="text-muted-foreground">Price:</dt>
                      <dd className="font-medium">{p.price}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <dt className="text-muted-foreground">Players:</dt>
                      <dd className="font-medium">{p.players}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <dt className="text-muted-foreground">Size:</dt>
                      <dd className="font-medium">{p.storage}</dd>
                    </div>
                  </dl>

                  <p className="text-sm text-muted-foreground mb-3">{p.demo}</p>

                  <ul className="space-y-1.5 mb-5">
                    {p.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={p.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm font-medium hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
                  >
                    Visit {p.store}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>

          <div className="scroll-reveal flex items-start gap-3 p-4 md:p-5 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <Languages className="w-5 h-5 text-[hsl(var(--nav-theme-light))] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              {m.heaveHo2ReleaseDatePricePlatforms.languageNote}
            </p>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-2">
              {m.heaveHo2BeginnerGuide.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {m.heaveHo2BeginnerGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {m.heaveHo2BeginnerGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {m.heaveHo2BeginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {index + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-2">
                    {step.instruction}
                  </p>
                  <div className="flex items-start gap-2 text-sm">
                    <Users className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                    <span><span className="font-semibold">Team tip:</span> {step.teamTip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {m.heaveHo2BeginnerGuide.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 3: Controls and Swinging Guide */}
      <section id="controls-swinging-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-2">
              {m.heaveHo2ControlsSwinging.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {m.heaveHo2ControlsSwinging.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {m.heaveHo2ControlsSwinging.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {m.heaveHo2ControlsSwinging.controls.map((c: any, index: number) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                    <Hand className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  </span>
                  <h3 className="font-bold">{c.action}</h3>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Keyboard className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                    {c.input}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{c.effect}</p>
                <p className="text-sm">
                  <span className="font-semibold text-[hsl(var(--nav-theme-light))]">Technique: </span>
                  <span className="text-muted-foreground">{c.technique}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Multiplayer and Co-op Guide */}
      <section id="multiplayer-co-op-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-2">
              {m.heaveHo2MultiplayerCoop.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {m.heaveHo2MultiplayerCoop.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {m.heaveHo2MultiplayerCoop.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {m.heaveHo2MultiplayerCoop.modes.map((mode: any, index: number) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex-shrink-0">
                      <Wifi className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <h3 className="font-bold truncate">{mode.mode}</h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex-shrink-0">
                    {mode.players}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  <span className="font-semibold text-[hsl(var(--nav-theme-light))]">Platforms:</span> {mode.platforms}
                </p>
                <p className="text-sm text-muted-foreground mb-2">{mode.details}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Requires:</span> {mode.requirements}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 5: Walkthrough and World Guide */}
      <section id="walkthrough-and-world-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-2">
              {m.heaveHo2WalkthroughWorlds.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {m.heaveHo2WalkthroughWorlds.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {m.heaveHo2WalkthroughWorlds.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-3">
            {m.heaveHo2WalkthroughWorlds.worlds.map((w: any, index: number) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-white/5"
              >
                <button
                  onClick={() => setWorldExpanded(worldExpanded === index ? null : index)}
                  className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                    <Map className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                      World {w.order}
                    </span>
                    <h3 className="font-bold text-base md:text-lg truncate">{w.name}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${worldExpanded === index ? "rotate-180" : ""}`}
                  />
                </button>
                {worldExpanded === index && (
                  <div className="px-4 md:px-5 pb-5 pt-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {w.mechanics.map((mec: string, mi: number) => (
                        <span
                          key={mi}
                          className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
                        >
                          {mec}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-semibold text-foreground">Objective: </span>
                      {w.objective}
                    </p>
                    <div className="flex items-start gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-[hsl(var(--nav-theme-light))]">Tip: </span>
                        {w.tip}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Items, Unlocks and Cosmetics */}
      <section id="items-unlocks-and-cosmetics" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-2">
              {m.heaveHo2ItemsUnlocks.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {m.heaveHo2ItemsUnlocks.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {m.heaveHo2ItemsUnlocks.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {m.heaveHo2ItemsUnlocks.items.map((item: any, index: number) => {
              const isReward = /Reward|Unlock/i.test(item.type);
              const ItemIcon = isReward ? Gift : Package;
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                      <ItemIcon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.effect}</p>
                  <p className="text-sm">
                    <span className="font-semibold text-[hsl(var(--nav-theme-light))]">Best use: </span>
                    <span className="text-muted-foreground">{item.bestUse}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 7: Achievements Guide */}
      <section id="achievements-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-2">
              {m.heaveHo2Achievements.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {m.heaveHo2Achievements.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {m.heaveHo2Achievements.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-6">
            {m.heaveHo2Achievements.groups.map((group: any, gi: number) => (
              <div
                key={gi}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="font-bold text-lg">{group.name}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group.achievements.map((a: any, ai: number) => (
                    <div
                      key={ai}
                      className="flex items-start gap-2 p-3 bg-white/5 border border-border rounded-lg"
                    >
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-[hsl(var(--nav-theme-light))]">
                          {a.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {a.requirement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: System Requirements and PC Settings */}
      <section id="system-requirements-and-pc-settings" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-2">
              {m.heaveHo2SystemRequirements.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {m.heaveHo2SystemRequirements.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {m.heaveHo2SystemRequirements.intro}
            </p>
          </div>

          {/* Spec Table */}
          <div className="scroll-reveal overflow-x-auto mb-8 md:mb-10">
            <table className="w-full border border-border rounded-xl overflow-hidden text-sm">
              <thead>
                <tr className="bg-[hsl(var(--nav-theme)/0.1)]">
                  <th className="text-left p-3 md:p-4 font-semibold">Component</th>
                  <th className="text-left p-3 md:p-4 font-semibold text-[hsl(var(--nav-theme-light))]">Minimum</th>
                  <th className="text-left p-3 md:p-4 font-semibold text-[hsl(var(--nav-theme-light))]">Recommended</th>
                </tr>
              </thead>
              <tbody>
                {m.heaveHo2SystemRequirements.specs.map((s: any, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="p-3 md:p-4 font-medium align-top">{s.component}</td>
                    <td className="p-3 md:p-4 text-muted-foreground align-top">{s.minimum}</td>
                    <td className="p-3 md:p-4 text-muted-foreground align-top">{s.recommended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Settings Cards */}
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-4">
            {m.heaveHo2SystemRequirements.settingsCards.map((sc: any, index: number) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                    <Cpu className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  </span>
                  <h3 className="font-bold">{sc.name}</h3>
                </div>
                <p className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] inline-block mb-3">
                  {sc.preset}
                </p>
                <ul className="space-y-2">
                  {sc.tips.map((tip: string, ti: number) => (
                    <li key={ti} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/devolverdigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/HeaveHo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/app/2802740"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/2802740/Heave_Ho_2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                  </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
