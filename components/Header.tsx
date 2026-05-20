import formApi from "@/content/form-api.json";
// import { PencilSquareIcon } from "@/icons/Icons";

export default function Header() {
  return (
    <header className="col-span-3 lg:col-span-2 row-span-1 p-2.5">
      <h1 className="flex items-center gap-2 font-medium text-neutral-400">
        <span className="hidden">#FIAEC001</span>
        <span className="hidden">•</span>
        <span className="text-xl font-bold col-secondary">
          {formApi.form.title}
        </span>
      </h1>
    </header>
  );
}
