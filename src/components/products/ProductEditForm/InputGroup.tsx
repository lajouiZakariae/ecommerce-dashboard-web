import Input from '@/common/Input';

<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
    <div className="w-full xl:w-1/2">
        <label className="mb-2.5 block text-black dark:text-white">Cost</label>
        <Input type="text" placeholder="0.00" />
    </div>

    <div className="w-full xl:w-1/2">
        <label className="mb-2.5 block text-black dark:text-white">Price</label>
        <Input type="text" placeholder="Enter your last name" />
    </div>
</div>;
