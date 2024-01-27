import FormGroup from '@/common/FormGroup';
import Input from '@/common/Input';
import useCreateProduct from './useCreateProduct';
import { FormEvent, useState } from 'react';

export default function CreateProductForm() {
    const [title, setTitle] = useState('');
    const { isPending, mutate } = useCreateProduct();

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        mutate({ title });
    };

    return (
        <form onSubmit={submitHandler}>
            <FormGroup labelText="Title" className="mb-3">
                <Input
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />
            </FormGroup>

            <button className="btn btn-block btn-primary">Create</button>
        </form>
    );
}
