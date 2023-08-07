import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IProposal } from '@/types/governance';

const useProposals = () => {
    const protocol = "compound"

    const url = `/governance/${protocol}/proposals`
    const { data, error, isValidating } = useSWR<IProposal[], any>(protocol ? url : null , fetcher);

    return {
        proposals: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useProposals;