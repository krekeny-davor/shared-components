import { createComponent, getTitle } from '../../.storybook/templates';
import { includesformhtml as formTemplate } from '../../.storybook/generatedIncludes';

const options = getTitle({
  title: 'Form',
});

export default {
  ...options,
};

const baseArgs = {
  container: true,
  form: {
    headline: 'Headline Form',
    subline: 'Subline lorem ipsum dolor sit',
    cta: {
      skin: 'primary',
      width: 'w-50',
    },
    ctaText: 'Bewerbung absenden',
    method: 'post',
    action: '',
    fields: [
      {
        label: 'Vorname',
        type: 'text',
        col: 6,
        rowStart: true,
        required: true,
      },
      {
        label: 'Nachname',
        type: 'text',
        col: 6,
        rowEnd: true,
        required: true,
      },
      {
        label: 'E-Mail Adresse',
        type: 'text',
        col: 6,
        rowStart: true,
        required: true,
      },
      {
        label: 'Telefon',
        type: 'text',
        col: 6,
        rowEnd: true,
        required: true,
      },
      {
        label: 'Kündigungsfrist (optional)',
        type: 'text',
        col: 6,
        rowStart: true,
      },
      {
        label: 'Gehaltsvorstellung (optional)',
        type: 'text',
        col: 6,
        rowEnd: true,
      },
      {
        label: 'Nachricht (optional)',
        type: 'textarea',
      },
      {
        label:
          "<small>Lorem ipsum dolor sit amet, consectetur adipiscing elit <a href='javascript:void()'>Lorem Ipsum</a>. Sit amet consectetur adipiscing elit.</small>",
        type: 'checkbox',
        id: 'privacy',
        required: true,
      },
    ],
  },
  light: false,
};

const Template = (args) => createComponent(args, formTemplate);

export const Form = Template.bind({});

Form.args = {
  ...baseArgs,
};

// TODO add examples with checkboxes validation
// export const Form = Template.bind({});

// Form.args = {
//   ...baseArgs,
// };
