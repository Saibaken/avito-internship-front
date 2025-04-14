import { useBoards } from "@/api/boards";
import {
    TaskPriorityEnum,
    TaskStatusEnum,
    useTaskCreate,
    useTaskDetail,
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
import { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { NavLink, useMatch } from "react-router";
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

const updateFormSchema = z.object({
    title: z.string().nonempty("Обязательное поле"),
    description: z.string().nonempty("Обязательное поле"),
    boardId: z.coerce.number({
        required_error: "Обязательное поле",
        invalid_type_error: "Обязательное поле",
    }),
    priority: z.string().nonempty("Обязательное поле"),
    status: z.string().nonempty("Обязательное поле"),
    assigneeId: z.coerce.number({
        required_error: "Обязательное поле",
        invalid_type_error: "Обязательное поле",
    }),
});

const createFormToApiPayload = (values: CreateFormValues) => ({
    title: values.title,
    description: values.description,
    boardId: Number(values.boardId),
    priority: values.priority as TaskPriorityEnum,
    assigneeId: Number(values.assigneeId),
});

const updateFormToApiPayload = (values: UpdateFormValues, taskId: number) => ({
    taskId,
    title: values.title,
    description: values.description,
    boardId: Number(values.boardId),
    priority: values.priority as TaskPriorityEnum,
    status: values.status as TaskStatusEnum,
    assigneeId: Number(values.assigneeId),
});

interface CreateIssueFormProps {
    boardId?: number;
    onSuccess?: () => void;
}

type CreateFormValues = z.infer<typeof createFormSchema>;
type UpdateFormValues = z.infer<typeof updateFormSchema>;

interface UpdateIssueFormProps {
    taskId: number;
    boardId: number;
    onSuccess?: () => void;
}

function CommonTaskFields({ isUpdate = false }: { isUpdate?: boolean }) {
    const boards = useBoards();
    const users = useUsers();

    const { control } = useFormContext<UpdateFormValues>();

    return (
        <>
            <FormField
                control={control}
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
                control={control}
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
                control={control}
                name="boardId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Проект</FormLabel>
                        <Select
                            disabled={isUpdate}
                            onValueChange={field.onChange}
                            value={
                                field.value ? String(field.value) : undefined
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
                control={control}
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

            {isUpdate && (
                <FormField
                    control={control}
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
                control={control}
                name="assigneeId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Исполнитель</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            value={
                                field.value ? String(field.value) : undefined
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
                                            <AvatarImage src={user.avatarUrl} />
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
        </>
    );
}

export function CreateIssueForm({ boardId, onSuccess }: CreateIssueFormProps) {
    const createTask = useTaskCreate();

    const form = useForm<CreateFormValues>({
        resolver: zodResolver(createFormSchema),
        defaultValues: { boardId },
    });

    const onSubmit = async (values: CreateFormValues) => {
        await createTask.mutateAsync(createFormToApiPayload(values));
        form.reset();
        if (onSuccess) onSuccess();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4"
            >
                <CommonTaskFields />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="ml-auto mt-2 cursor-pointer"
                        disabled={form.formState.isSubmitting}
                    >
                        Создать задачу
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export function UpdateIssueForm({
    taskId,
    boardId,
    onSuccess,
}: UpdateIssueFormProps) {
    const taskData = useTaskDetail(taskId);
    const updateTask = useTaskUpdate();
    const isBoardsPage = useMatch("/boards/:id");

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: {
            ...taskData.data?.data,
            boardId,
            assigneeId: taskData.data?.data.assignee.id,
        },
    });

    const onSubmit = async (values: UpdateFormValues) => {
        await updateTask.mutateAsync(updateFormToApiPayload(values, taskId));
        await taskData.refetch();
        form.reset();
        if (onSuccess) onSuccess();
    };

    useEffect(() => {
        if (taskData.data) {
            const task = taskData.data.data;

            form.reset({
                title: task.title,
                description: task.description,
                boardId: boardId,
                assigneeId: task.assignee?.id ?? undefined,
                priority: task.priority,
                status: task.status,
            });
        }
    }, [taskData.data, form, boardId]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4"
            >
                <CommonTaskFields isUpdate />

                <div className="flex justify-between items-baseline">
                    {!isBoardsPage && (
                        <NavLink to={`/boards/${boardId}`}>
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                            >
                                Перейти к доске
                            </Button>
                        </NavLink>
                    )}
                    <Button
                        type="submit"
                        className="ml-auto mt-2 cursor-pointer"
                        disabled={form.formState.isSubmitting}
                    >
                        Применить
                    </Button>
                </div>
            </form>
        </Form>
    );
}
