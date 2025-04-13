import { useBoards } from "@/api/boards";
import {
    TaskPriorityEnum,
    TaskStatusEnum,
    useTaskCreate,
    useTaskUpdate,
} from "@/api/tasks";
import { useUsers } from "@/api/users/queries";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
} from "@/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/atoms/avatar";
import { priorityDictionary, statusDictionary } from "@/consts/issues";
import { priorityIcon, statusBadge } from "@/elements/issues/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import * as z from "zod";

const createFormSchema = z.object({
    title: z.string().nonempty("Обязательное поле"),
    description: z.string().nonempty("Обязательное поле"),
    boardId: z.coerce.number({
        required_error: "Обязательное поле",
        invalid_type_error: "Обязательное поле",
    }),
    priority: z.string().nonempty("Обязательное поле"),
    assigneeId: z.coerce.number({
        required_error: "Обязательное поле",
        invalid_type_error: "Обязательное поле",
    }),
});

const updateFormSchema = createFormSchema.extend({
    status: z.string().nonempty("Обязательное поле"),
});

type CreateFormValues = z.infer<typeof createFormSchema>;
type UpdateFormValues = z.infer<typeof updateFormSchema>;

const createFormToApiPayload = (values: CreateFormValues) => ({
    title: values.title,
    description: values.description,
    boardId: Number(values.boardId),
    priority: values.priority as TaskPriorityEnum,
    assigneeId: Number(values.assigneeId),
});

const updateFormToApiPayload = (values: UpdateFormValues, taskId: number) => ({
    taskId,
    ...createFormToApiPayload(values),
    status: values.status as TaskStatusEnum,
});

interface CreateIssueFormProps {
    isCreate: true;
    defaultValues?: never;
    taskId?: never;
    boardId?: never;
}

interface UpdateIssueFormProps {
    isCreate?: false;
    defaultValues: UpdateFormValues;
    taskId: number;
    boardId: number;
}

type IssueFormProps = (CreateIssueFormProps | UpdateIssueFormProps) & {
    onSuccess?: () => void;
};

export function IssueForm({
    defaultValues,
    taskId,
    boardId,
    isCreate = false,
    onSuccess,
}: IssueFormProps) {
    const createTask = useTaskCreate();
    const updateTask = useTaskUpdate();
    const boards = useBoards();
    const users = useUsers();

    const form = useForm<CreateFormValues | UpdateFormValues>({
        resolver: zodResolver(isCreate ? createFormSchema : updateFormSchema),
        defaultValues: { ...defaultValues, boardId },
    });

    const onSubmit = async (values: CreateFormValues | UpdateFormValues) => {
        if (isCreate) {
            await createTask.mutateAsync(
                createFormToApiPayload(values as CreateFormValues)
            );
            form.reset();
            if (onSuccess) onSuccess();
        } else {
            if (taskId)
                await updateTask.mutateAsync(
                    updateFormToApiPayload(values as UpdateFormValues, taskId)
                );
            if (onSuccess) onSuccess();
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Описание</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="boardId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Проект</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={
                                    field.value
                                        ? String(field.value)
                                        : undefined
                                }
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Выберите проект" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {boards.data?.data.map((board) => (
                                        <SelectItem
                                            key={board.id}
                                            value={String(board.id)}
                                        >
                                            {board.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Приоритет</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Выберите приоритет" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(priorityDictionary).map(
                                        ([priority, priorityName]) => (
                                            <SelectItem
                                                key={priority}
                                                value={priority}
                                            >
                                                {priorityIcon(
                                                    priority as TaskPriorityEnum
                                                )}
                                                {priorityName}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {!isCreate && (
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Статус</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Выберите статус" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.keys(statusDictionary).map(
                                            (status) => (
                                                <SelectItem
                                                    key={status}
                                                    value={status}
                                                >
                                                    {statusBadge(
                                                        status as TaskStatusEnum
                                                    )}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="assigneeId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Исполнитель</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={
                                    field.value
                                        ? String(field.value)
                                        : undefined
                                }
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Выберите исполнителя" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {users.data?.data.map((user) => (
                                        <SelectItem
                                            key={user.id}
                                            value={String(user.id)}
                                        >
                                            <Avatar className="w-4 h-4">
                                                <AvatarImage
                                                    src={user.avatarUrl}
                                                />
                                                <AvatarFallback>
                                                    {user.fullName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            {user.fullName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between">
                    {!isCreate && (
                        <NavLink to={`/boards/${boardId}`}>
                            <Button variant="outline">Перейти к доске</Button>
                        </NavLink>
                    )}
                    <Button
                        type="submit"
                        className="ml-auto mt-2"
                        disabled={form.formState.isSubmitting}
                    >
                        {isCreate ? "Создать задачу" : "Применить"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
