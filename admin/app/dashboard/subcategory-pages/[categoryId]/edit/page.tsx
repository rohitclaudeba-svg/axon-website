"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ImageUploadField } from "@/components/ImageUploadField";
import { RichTextEditor } from "@/components/RichTextEditor";
import { TextListEditor } from "@/components/TextListEditor";
import { TitleDescriptionListEditor } from "@/components/TitleDescriptionListEditor";
import { FaqListEditor } from "@/components/FaqListEditor";
import { SECTION_LABELS_LIST } from "@/lib/sectionMeta";
import type {
  SubcategoryPageDetailDto,
  SectionDto,
  SectionType,
  HeroSectionData,
  AboutSectionData,
  HowItHelpsSectionData,
  ApproachSectionData,
  BenefitsSectionData,
  WhyChooseUsSectionData,
  FaqsSectionData,
} from "@/lib/types";

export default function EditSubcategoryPage() {
  const params = useParams<{ categoryId: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);

  const [page, setPage] = useState<SubcategoryPageDetailDto | null>(null);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [sections, setSections] = useState<SectionDto[]>([]);

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: SubcategoryPageDetailDto }>(`/api/subcategory-pages/by-category/${params.categoryId}`)
      .then((result) => {
        const data = result.data;
        setPage(data);
        setSeoTitle(data.seoTitle);
        setSeoDescription(data.seoDescription);
        setSeoKeywords(data.seoKeywords);
        setFeaturedImageUrl(data.featuredImageUrl);
        setStatus(data.status);
        setSections(data.sections);
      })
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load page."))
      .finally(() => setLoading(false));
  }, [params.categoryId]);

  const updateSection = (type: SectionType, patch: Record<string, unknown>) => {
    setSections((prev) =>
      prev.map((s) => (s.type === type ? { ...s, data: { ...s.data, ...patch } } : s))
    );
  };

  const toggleSectionEnabled = (type: SectionType, enabled: boolean) => {
    setSections((prev) => prev.map((s) => (s.type === type ? { ...s, enabled } : s)));
  };

  const moveSection = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= sections.length) return;
    setSections((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const onSave = async () => {
    if (!page) return;
    setSaveError("");
    setSaved(false);
    setSaving(true);
    try {
      // Parent category pages (Home, About, Contact, etc.) have no draft/publish
      // workflow — they're core nav pages that are always live, and the simplified
      // hero-only editor has no status control. Saving always publishes them,
      // so an uploaded banner reflects on the site without a separate step.
      const isParentCategory = !page.parentName;
      const payload = {
        seoTitle,
        seoDescription,
        seoKeywords,
        featuredImageUrl,
        status: isParentCategory ? "published" : status,
        sections: sections.map((s, index) => ({
          type: s.type,
          enabled: s.enabled,
          position: index,
          data: s.data,
        })),
      };
      const result = await apiClient.put<{ ok: true; data: SubcategoryPageDetailDto }>(
        `/api/subcategory-pages/${page.pageId}`,
        payload
      );
      setPage(result.data);
      setSections(result.data.sections);
      setSaved(true);
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>;
  if (!page) return null;

  // Parent category pages (Home, About, Contact, etc.) are top-level pages with
  // their own hand-built layout — only the Hero Banner is admin-editable here.
  // Subcategories (service/program detail pages) keep the full section set.
  const isParentCategory = !page.parentName;
  const visibleSections = isParentCategory ? sections.filter((s) => s.type === "hero") : sections;

  return (
    <div className="pb-24">
      <h1 className="text-xl font-bold text-slate-900">Edit: {page.name}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {page.parentName ? `${page.parentName} → ${page.name}` : page.name} · URL: {page.url}
      </p>
      {isParentCategory && (
        <p className="mt-1 text-sm text-slate-500">
          This is a top-level page — only the Hero Banner below is editable here.
        </p>
      )}

      <div className="mt-6 space-y-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="bg-slate-50 px-4 py-3">
            <span className="font-semibold text-slate-900">General Information</span>
          </div>
          <div className="space-y-4 px-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {page.parentName ? "Subcategory name" : "Category name"}
                </label>
                <input
                  type="text"
                  value={page.name}
                  disabled
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
                />
                <p className="mt-1 text-xs text-slate-400">Edit name/parent/slug from the Categories module.</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Parent category</label>
                <input
                  type="text"
                  value={page.parentName || "— (this is a parent category)"}
                  disabled
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
                />
              </div>
            </div>

            {isParentCategory ? (
              <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                This page is always live — changes go out as soon as you save, no publish step needed.
              </p>
            ) : (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Page status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none sm:w-60"
                >
                  <option value="draft">Draft (not visible on the site)</option>
                  <option value="published">Published (live on the site)</option>
                </select>
              </div>
            )}

            <ImageUploadField
              label="Featured image"
              value={featuredImageUrl}
              onChange={setFeaturedImageUrl}
              dimensionHint="1200 × 630px (used for search & social previews)"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">SEO title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">SEO keywords</label>
                <input
                  type="text"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  placeholder="comma, separated, keywords"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">SEO description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                rows={2}
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {visibleSections.map((section, index) => (
          <CollapsibleSection
            key={section.type}
            title={SECTION_LABELS_LIST[section.type]}
            enabled={section.enabled}
            onToggleEnabled={(enabled) => toggleSectionEnabled(section.type, enabled)}
            onMoveUp={() => moveSection(index, -1)}
            onMoveDown={() => moveSection(index, 1)}
            canMoveUp={index > 0}
            canMoveDown={index < visibleSections.length - 1}
            defaultOpen={index === 0}
          >
            {section.type === "hero" && (
              <HeroFields data={section.data as HeroSectionData} onChange={(patch) => updateSection("hero", patch)} />
            )}
            {section.type === "about" && (
              <AboutFields data={section.data as AboutSectionData} onChange={(patch) => updateSection("about", patch)} />
            )}
            {section.type === "how_it_helps" && (
              <HowItHelpsFields
                data={section.data as HowItHelpsSectionData}
                onChange={(patch) => updateSection("how_it_helps", patch)}
              />
            )}
            {section.type === "approach" && (
              <ApproachFields
                data={section.data as ApproachSectionData}
                onChange={(patch) => updateSection("approach", patch)}
              />
            )}
            {section.type === "benefits" && (
              <BenefitsFields
                data={section.data as BenefitsSectionData}
                onChange={(patch) => updateSection("benefits", patch)}
              />
            )}
            {section.type === "why_choose_us" && (
              <WhyChooseUsFields
                data={section.data as WhyChooseUsSectionData}
                onChange={(patch) => updateSection("why_choose_us", patch)}
              />
            )}
            {section.type === "faqs" && (
              <FaqsFields data={section.data as FaqsSectionData} onChange={(patch) => updateSection("faqs", patch)} />
            )}
          </CollapsibleSection>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:pl-64">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="text-sm">
            {saveError && <span className="text-red-600">{saveError}</span>}
            {saved && !saveError && <span className="text-green-600">Saved.</span>}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                router.push(page.parentName ? "/dashboard/subcategory-pages" : "/dashboard/parent-category-pages")
              }
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none";

function HeroFields({ data, onChange }: { data: HeroSectionData; onChange: (patch: Partial<HeroSectionData>) => void }) {
  return (
    <>
      <Field label="Heading">
        <input type="text" value={data.heading} onChange={(e) => onChange({ heading: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Subtitle / description">
        <input type="text" value={data.subtitle} onChange={(e) => onChange({ subtitle: e.target.value })} className={inputClass} />
      </Field>
      <ImageUploadField
        label="Banner image (desktop)"
        value={data.imageUrl}
        onChange={(imageUrl) => onChange({ imageUrl })}
        dimensionHint="1920 × 600px (wide landscape banner)"
      />
      <ImageUploadField
        label="Banner image (mobile)"
        value={data.mobileImageUrl ?? null}
        onChange={(mobileImageUrl) => onChange({ mobileImageUrl })}
        dimensionHint="800 × 1000px (tall, shown on phone screens) — optional, falls back to the desktop image if left blank"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Button text (optional)">
          <input type="text" value={data.buttonText} onChange={(e) => onChange({ buttonText: e.target.value })} className={inputClass} />
        </Field>
        <Field label="Button URL (optional)">
          <input type="text" value={data.buttonUrl} onChange={(e) => onChange({ buttonUrl: e.target.value })} className={inputClass} />
        </Field>
      </div>
    </>
  );
}

function AboutFields({ data, onChange }: { data: AboutSectionData; onChange: (patch: Partial<AboutSectionData>) => void }) {
  return (
    <>
      <Field label="Section heading">
        <input type="text" value={data.heading} onChange={(e) => onChange({ heading: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Content">
        <RichTextEditor value={data.content} onChange={(content) => onChange({ content })} />
      </Field>
      <ImageUploadField
        label="Image"
        value={data.imageUrl}
        onChange={(imageUrl) => onChange({ imageUrl })}
        dimensionHint="800 × 1000px (portrait, 4:5 ratio)"
      />
      <Field label="Image position">
        <select
          value={data.imagePosition}
          onChange={(e) => onChange({ imagePosition: e.target.value as "left" | "right" })}
          className={`${inputClass} sm:w-48`}
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </Field>
    </>
  );
}

function HowItHelpsFields({
  data,
  onChange,
}: {
  data: HowItHelpsSectionData;
  onChange: (patch: Partial<HowItHelpsSectionData>) => void;
}) {
  return (
    <>
      <Field label="Section heading">
        <input type="text" value={data.heading} onChange={(e) => onChange({ heading: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Content">
        <RichTextEditor value={data.content} onChange={(content) => onChange({ content })} />
      </Field>
      <ImageUploadField
        label="Banner / image"
        value={data.imageUrl}
        onChange={(imageUrl) => onChange({ imageUrl })}
        dimensionHint="800 × 1000px (portrait, 4:5 ratio)"
      />
      <Field label="Additional content (optional)">
        <RichTextEditor value={data.additionalContent} onChange={(additionalContent) => onChange({ additionalContent })} />
      </Field>
    </>
  );
}

function ApproachFields({
  data,
  onChange,
}: {
  data: ApproachSectionData;
  onChange: (patch: Partial<ApproachSectionData>) => void;
}) {
  return (
    <>
      <Field label="Section heading">
        <input type="text" value={data.heading} onChange={(e) => onChange({ heading: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Subtitle">
        <input type="text" value={data.subtitle} onChange={(e) => onChange({ subtitle: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Items">
        <TitleDescriptionListEditor items={data.items} onChange={(items) => onChange({ items })} />
      </Field>
    </>
  );
}

function BenefitsFields({
  data,
  onChange,
}: {
  data: BenefitsSectionData;
  onChange: (patch: Partial<BenefitsSectionData>) => void;
}) {
  return (
    <>
      <Field label="Section heading">
        <input type="text" value={data.heading} onChange={(e) => onChange({ heading: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Description">
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </Field>
      <Field label="Items">
        <TextListEditor items={data.items} onChange={(items) => onChange({ items })} placeholder="e.g. Children with speech delays" />
      </Field>
      <ImageUploadField
        label="Image (optional)"
        value={data.imageUrl}
        onChange={(imageUrl) => onChange({ imageUrl })}
        dimensionHint="800 × 1000px (portrait, 4:5 ratio)"
      />
    </>
  );
}

function WhyChooseUsFields({
  data,
  onChange,
}: {
  data: WhyChooseUsSectionData;
  onChange: (patch: Partial<WhyChooseUsSectionData>) => void;
}) {
  return (
    <>
      <Field label="Section heading">
        <input type="text" value={data.heading} onChange={(e) => onChange({ heading: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Description">
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </Field>
      <Field label="Content">
        <RichTextEditor value={data.content} onChange={(content) => onChange({ content })} />
      </Field>
      <Field label="Supporting points">
        <TextListEditor items={data.points} onChange={(points) => onChange({ points })} placeholder="e.g. Experienced therapists" />
      </Field>
      <ImageUploadField
        label="Image (optional)"
        value={data.imageUrl}
        onChange={(imageUrl) => onChange({ imageUrl })}
        dimensionHint="800 × 1000px (portrait, 4:5 ratio)"
      />
    </>
  );
}

function FaqsFields({ data, onChange }: { data: FaqsSectionData; onChange: (patch: Partial<FaqsSectionData>) => void }) {
  return <FaqListEditor items={data.items} onChange={(items) => onChange({ items })} />;
}
