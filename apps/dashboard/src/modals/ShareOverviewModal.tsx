import { ButtonContainer } from '@/components/button-container';
import { InputWithLabel } from '@/components/forms/input-with-label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppParams } from '@/hooks/useAppParams';
import { api, handleError } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { zShareOverview } from '@openpanel/validation';

import { popModal } from '.';
import { ModalContent, ModalHeader } from './Modal/Container';

const validator = zShareOverview;

type IForm = z.infer<typeof validator>;

export default function ShareOverviewModal() {
  const { projectId, organizationId } = useAppParams();
  const router = useRouter();

  const { register, handleSubmit, control } = useForm<IForm>({
    resolver: zodResolver(validator),
    defaultValues: {
      public: true,
      password: '',
      projectId,
      organizationId,
    },
  });

  const mutation = api.share.shareOverview.useMutation({
    onError: handleError,
    onSuccess(res) {
      router.refresh();
      toast('Success', {
        description: `Your overview is now ${
          res.public ? 'public' : 'private'
        }`,
      });
      popModal();
    },
  });

  return (
    <ModalContent>
      <ModalHeader title="Overview access" />
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((values) => {
          mutation.mutate(values);
        })}
      >
        <Controller
          name="public"
          control={control}
          render={({ field }) => (
            <label
              htmlFor="public"
              className="mb-4 flex items-center gap-2  font-medium leading-none"
            >
              <Checkbox
                id="public"
                ref={field.ref}
                onBlur={field.onBlur}
                defaultChecked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                }}
              />
              Make it public!
            </label>
          )}
        />
        <InputWithLabel
          label="Password"
          placeholder="Make your overview accessable with password"
          {...register('password')}
        />
        <ButtonContainer>
          <Button type="button" variant="outline" onClick={() => popModal()}>
            Cancel
          </Button>
          <Button type="submit" loading={mutation.isLoading}>
            Update
          </Button>
        </ButtonContainer>
      </form>
    </ModalContent>
  );
}
