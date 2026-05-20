"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

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

  useEffect(() => {
    if (!visibleSteps.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveStep(null);
      return;
    }

    const firstVisibleStep = visibleSteps[0]?.step ?? null;
    setActiveStep((current) => current ?? firstVisibleStep);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (!visibleEntries.length) {
          return;
        }

        visibleEntries.sort((left, right) => {
          const leftTop = left.boundingClientRect.top;
          const rightTop = right.boundingClientRect.top;

          return Math.abs(leftTop) - Math.abs(rightTop);
        });

        const currentStep = Number(
          visibleEntries[0]?.target.getAttribute("data-step") ??
            firstVisibleStep,
        );

        if (!Number.isNaN(currentStep)) {
          setActiveStep(currentStep);
        }
      },
      // IntersectionObserver options:
      // - rootMargin: inset/outset rectangle applied to the root's bounding box
      //   (format: '<top> <right> <bottom> <left>' in px or %).
      //   Here "-20% 0px -20% 0px" moves the top boundary up 20% and the bottom
      //   boundary up 20% relative to the viewport so entries become "intersecting"
      //   earlier as they approach the viewport (helps detect the current section
      //   slightly before it reaches the top).
      // - threshold: a number between 0 and 1 indicating the percentage of the
      //   target's area that must be visible to consider it intersecting. 0.25
      //   means the callback runs when ~25% of the element is visible.
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0.25,
      },
    );

    stepRefs.current.forEach((stepElement) => {
      if (stepElement) {
        observer.observe(stepElement);
      }
    });

    return () => observer.disconnect();
  }, [visibleSteps]);

  const scrollToStep = (stepIndex: number) => {
    const stepElement = stepRefs.current[stepIndex];

    if (!stepElement) {
      return;
    }

    stepElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
    <section className="relative flex w-full">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6">
        <form onSubmit={handleSubmit} className="space-y-6 p-4 lg:p-6">
          {visibleSteps.map((step, stepIndex) => (
            <div key={`${step.step}-${step.title}`}>
              <article
                ref={(element) => {
                  stepRefs.current[stepIndex] = element;
                }}
                data-step={step.step}
              >
                <h2 className="text-lg font-semibold text-neutral-800">
                  {step.title}
                </h2>

                <div className="grid">
                  {step.fields.map((field) => {
                    const value = formData[field.id];

                    return (
                      <div key={field.id} className="rounded-xl p-4">
                        <label className="mb-2 block text-sm font-medium text-neutral-400">
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
                            className="w-full rounded-lg border border-transparent bg-primary px-3 py-2 text-sm outline-none transition focus:border-neutral-800"
                          />
                        )}

                        {(field.type === "bool" ||
                          field.type === "select_one") &&
                          field.options && (
                            <div className="flex flex-wrap gap-3">
                              {field.options.map((option) => (
                                <label
                                  key={option}
                                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border border-(--color-1) transition px-3 py-2 text-sm ${value === option ? "bg-violet-500 col-primary border-violet-300" : "text-neutral-400 hover:text-violet-400 hover:border-violet-200"}`}
                                >
                                  <input
                                    type="radio"
                                    name={field.id}
                                    checked={value === option}
                                    onChange={() =>
                                      handleSingleChoiceChange(field.id, option)
                                    }
                                    className="hidden"
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
              <div className="[border-top:_2px_dashed_var(--color-1)] w-full"></div>
            </div>
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
          <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-2 lg:p-4">
            <h3 className="mb-2 text-sm font-semibold text-neutral-900">
              Payload generado
            </h3>
            <pre className="max-h-96 overflow-auto rounded-lg bg-secondary p-4 text-xs text-neutral-100">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </section>
        )}
      </div>
      <aside className="hidden lg:block lg:sticky top-0 shrink-0 self-start w-sm p-4">
        <div className="flex flex-col p-4 gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            En este formulario
          </p>
          <nav className="space-y-2">
            {visibleSteps.map((step, stepIndex) => {
              const isActive = activeStep === step.step;

              return (
                <button
                  key={`${step.step}-${step.title}`}
                  type="button"
                  onClick={() => scrollToStep(stepIndex)}
                  className={`flex w-full items-center justify-between text-left text-sm transition gap-4 cursor-pointer ${
                    isActive
                      ? "col-secondary font-medium"
                      : "text-neutral-400 hover:text-neutral-700"
                  }`}
                >
                  <span className="ml-4 w-16 shrink-0 text-xs uppercase tracking-widest opacity-70">
                    Paso {step.step}
                  </span>
                  <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </section>
  );
}
