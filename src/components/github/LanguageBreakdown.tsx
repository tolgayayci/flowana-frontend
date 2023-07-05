import useLanguageBreakdown from "@/models/github/useLanguageBreakdown";
export default function LanguageBreakdown() {
  const { languageBreakdown } = useLanguageBreakdown("polkadot");

  return (
    <div>
      <h1>Language Breakdown</h1>
      {JSON.stringify(languageBreakdown, null, 2)}
    </div>
  );
}
