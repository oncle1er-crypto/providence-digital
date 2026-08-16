import { admissionFaqs } from "@/data/admissions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AdmissionsFaq() {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-4xl space-y-4">
      {admissionFaqs.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`faq-${index + 1}`}
          className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-sm transition-shadow data-[state=open]:shadow-lg sm:px-7"
        >
          <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-primary hover:no-underline sm:py-6 sm:text-lg">
            <span className="pr-5">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-6 leading-7 text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
