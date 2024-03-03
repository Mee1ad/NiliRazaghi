import supabase from "@/config/supabase_service";
import {FEEDBACK_TABLE} from "@/config/consts";
import {Feedback} from '@/interface/feedback.interface'

export const fetchFeedbacks = async () => {
    const {data: feedbacks, error} = await supabase
        .from(FEEDBACK_TABLE)
        .select("*, nili_image (*)")
        .not("name", "eq", null)
        .not("text", "eq", null)
    return feedbacks as Feedback[]
}