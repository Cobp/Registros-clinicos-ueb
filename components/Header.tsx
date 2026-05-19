import formApi from "@/content/form-api.json";
import { PencilSquareIcon } from "@/icons/Icons";

export default function Header() {
  return (
    <header className="col-span-2 row-span-1 p-2.5">
      <h1 className="flex items-center gap-2 text-lg text-neutral-400">
        <PencilSquareIcon className="w-6 h-6" />
        <span className="font-medium">#68698 -</span>
        <span className="font-semibold col-secondary">{formApi.form.title}</span>
      </h1>
    </header>
  );
}
