import { z } from 'zod';

export const onboardingSchema = z.object({
  birthday: z.date({
    required_error: 'Date of birth is required',
  }),

  gender: z.string().min(1, 'Gender is required'),
  distance: z.number().min(1).max(500),
  worldwide: z.boolean().default(false),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
