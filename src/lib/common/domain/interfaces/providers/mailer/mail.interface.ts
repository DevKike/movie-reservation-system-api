import { TemplateType } from 'src/shared/templates/types/templates.type';

export interface IMail {
  from?: string;
  to: string;
  subject: string;
  template: {
    name: TemplateType;
    context: Record<string, any>;
  };
}
