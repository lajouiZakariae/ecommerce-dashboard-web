import FormGroup from '@/common/FormGroup';
import Input from '@/common/Input';
import useCreateProduct from './useCreateProduct';
import { FormEvent, useState } from 'react';
import ButtonLoading from '@/common/Loaders/ButtonLoading';

export default function CreateProductForm() {
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState<string | undefined>(undefined);

    const { isPending, mutate } = useCreateProduct(setTitleError);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        setTitleError(undefined);
        mutate({ title });
    };

    return (
        <form onSubmit={submitHandler}>
            <FormGroup
                labelText="Title"
                className="mb-3"
                errorMessage={titleError}
            >
                <Input
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                    error={Boolean(titleError)}
                />
            </FormGroup>

            {isPending ? (
                <ButtonLoading color="primary" className="w-full">
                    Creating...
                </ButtonLoading>
            ) : (
                <button className="btn btn-block btn-primary">Create</button>
            )}
        </form>
    );
}
