"use client";

import { FormEvent, useMemo, useState } from "react";
import formApi from "@/content/form-api.json";

type ConditionalRule = {
  field: string;
  value: string;
};

type FormField = {
  id: string;
  label: string;
  type: "string" | "bool" | "date" | "select_one" | "select_many";
  input: "textbox" | "checkbox";
  placeholder?: string;
  options?: string[];
  conditional?: ConditionalRule;
};

type FormStep = {
  step: number;
  title: string;
  fields: FormField[];
};

type FormDataValue = string | string[];
type FormDataMap = Record<string, FormDataValue>;

const steps = formApi.form.steps as FormStep[];

const getInitialValues = (allSteps: FormStep[]) => {
  const initialValues: FormDataMap = {};

  for (const step of allSteps) {
    for (const field of step.fields) {
      initialValues[field.id] = field.type === "select_many" ? [] : "";
    }
  }

  return initialValues;
};

export default function NewFormPage() {
  const [formData, setFormData] = useState<FormDataMap>(() =>
    getInitialValues(steps),
  );
  const [submittedData, setSubmittedData] = useState<FormDataMap | null>(null);

  const isFieldVisible = (field: FormField) => {
    if (!field.conditional) {
      return true;
    }

    const sourceValue = formData[field.conditional.field];

    if (Array.isArray(sourceValue)) {
      return sourceValue.includes(field.conditional.value);
    }

    return sourceValue === field.conditional.value;
  };

  const visibleSteps = useMemo(
    () =>
      steps
        .map((step) => ({
          ...step,
          fields: step.fields.filter(isFieldVisible),
        }))
        .filter((step) => step.fields.length > 0),
    [formData],
  );

  const handleTextChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSingleChoiceChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleMultiChoiceChange = (
    fieldId: string,
    value: string,
    checked: boolean,
  ) => {
    setFormData((prev) => {
      const current = prev[fieldId];
      const currentValues = Array.isArray(current) ? current : [];
      const nextValues = checked
        ? [...currentValues, value]
        : currentValues.filter((item) => item !== value);

      return { ...prev, [fieldId]: nextValues };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: FormDataMap = {};
    for (const step of steps) {
      for (const field of step.fields) {
        if (isFieldVisible(field)) {
          payload[field.id] = formData[field.id];
        }
      }
    }

    setSubmittedData(payload);
  };

  return (
    <section className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {visibleSteps.map((step) => (
          <article
            key={`${step.step}-${step.title}`}
            className="rounded-2xl border border-neutral-200 p-5"
          >
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">
              {step.title}
            </h2>

            <div className="grid gap-4">
              {step.fields.map((field) => {
                const value = formData[field.id];

                return (
                  <div
                    key={field.id}
                    className="rounded-xl border border-neutral-100 p-4"
                  >
                    <label className="mb-2 block text-sm font-medium text-neutral-800">
                      {field.label}
                    </label>

                    {field.type === "string" && (
                      <input
                        type="text"
                        value={typeof value === "string" ? value : ""}
                        onChange={(event) =>
                          handleTextChange(field.id, event.target.value)
                        }
                        placeholder={
                          field.placeholder || "Escriba su respuesta"
                        }
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-neutral-900"
                      />
                    )}

                    {(field.type === "bool" || field.type === "select_one") &&
                      field.options && (
                        <div className="flex flex-wrap gap-3">
                          {field.options.map((option) => (
                            <label
                              key={option}
                              className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
                            >
                              <input
                                type="radio"
                                name={field.id}
                                checked={value === option}
                                onChange={() =>
                                  handleSingleChoiceChange(field.id, option)
                                }
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      )}

                    {field.type === "select_many" && field.options && (
                      <div className="flex flex-wrap gap-3">
                        {field.options.map((option) => {
                          const selectedValues = Array.isArray(value)
                            ? value
                            : [];
                          const isChecked = selectedValues.includes(option);

                          return (
                            <label
                              key={option}
                              className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(event) =>
                                  handleMultiChoiceChange(
                                    field.id,
                                    option,
                                    event.target.checked,
                                  )
                                }
                              />
                              <span>{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                    {field.type === "date" && (
                      <input
                        type="date"
                        value={typeof value === "string" ? value : ""}
                        onChange={(event) =>
                          handleTextChange(field.id, event.target.value)
                        }
                        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        ))}

        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm text-neutral-700">
            Se mostrarán automáticamente los campos condicionales.
          </p>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Guardar formulario
          </button>
        </div>
      </form>

      {submittedData && (
        <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4">
          <h3 className="mb-2 text-sm font-semibold text-neutral-900">
            Payload generado
          </h3>
          <pre className="max-h-96 overflow-auto rounded-lg bg-secondary p-4 text-xs text-neutral-100">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </section>
      )}
    </section>
  );
}
