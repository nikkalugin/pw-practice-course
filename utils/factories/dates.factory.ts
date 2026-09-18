import { faker } from "@faker-js/faker";

function formatDate(date: Date): string {
    const isoDate = date.toISOString();

    const year = isoDate.slice(0, 4);
    const month = isoDate.slice(5, 7);
    const day = isoDate.slice(8, 10);

    return `${day}.${month}.${year}`;
}

export function generateCurrentDate() {
    const date = new Date();

    return {
        date,
        formattedDate: formatDate(date)
    };
}

interface DateParams {
    yearsToAdd?: number;
    yearsToSubtract?: number;
}

export function generateFutureDate({ yearsToAdd = 1 }: DateParams = {}) {
    const date = faker.date.future({ years: yearsToAdd });

    return {
        date,
        formattedDate: formatDate(date)
    };
}

export function generatePastDate({ yearsToSubtract = 1 }: DateParams = {}) {
    const date = faker.date.past({ years: yearsToSubtract });

    return {
        date,
        formattedDate: formatDate(date)
    };
}