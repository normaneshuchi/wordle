import {fetchWordAction} from "@/app/api/v1/words/actions.";

export async function GET(){
    const words = await fetchWordAction();
    return Response.json(words, {status: 200});
}