import { PropertySite } from "@/features/property-site/PropertySite";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <PropertySite />
    </>
  );
}
