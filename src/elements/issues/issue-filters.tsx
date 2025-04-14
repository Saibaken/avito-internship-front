import { TaskPriorityEnum, TaskStatusEnum } from "@/api/tasks";
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
} from "@/atoms";
import { priorityDictionary, statusDictionary } from "@/consts/issues";
import useDebounce from "@/hooks/useDebounce";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { priorityIcon, statusBadge } from "./common";

export interface IssuesFilter {
    status: TaskStatusEnum | null;
    priority: TaskPriorityEnum | null;
    query: string;
}

export function IssueFilters({
    onSubmit,
    onQueryChange,
    className,
    initialValues = { status: null, priority: null, query: "" },
}: {
    onSubmit: (filter: IssuesFilter) => void;
    onQueryChange: (query: string) => void;
    className?: string;
    initialValues?: IssuesFilter;
}) {
    const form = useForm({
        defaultValues: initialValues,
    });

    const query = form.watch("query");
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        onQueryChange(debouncedQuery);
    }, [debouncedQuery, onQueryChange]);

    const handleSubmit = (data: IssuesFilter) => {
        onSubmit({
            status: data.status,
            priority: data.priority,
            query: data.query,
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={className}
            >
                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem className="min-w-92">
                            <FormLabel>Поиск</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Искать по названию или исполнителю"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-wrap gap-4 items-end sm:flex-no-wrap">
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Приоритет</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-fit">
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

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Статус</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-fit">
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

                    <div className="flex gap-2 items-baseline">
                        <Button
                            className="cursor-pointer"
                            type="submit"
                            disabled={
                                !(
                                    form.watch("priority") ||
                                    form.watch("status")
                                )
                            }
                        >
                            Применить фильтры
                        </Button>
                        {(form.watch("status") !== null ||
                            form.watch("priority") !== null) && (
                            <Button
                                variant="destructive"
                                className="cursor-pointer"
                                type="button"
                                onClick={() => {
                                    const currentQuery =
                                        form.getValues("query");
                                    form.reset({
                                        status: null,
                                        priority: null,
                                        query: currentQuery,
                                    });
                                    onSubmit({
                                        status: null,
                                        priority: null,
                                        query: currentQuery,
                                    });
                                }}
                            >
                                Сбросить фильтры
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    );
}
