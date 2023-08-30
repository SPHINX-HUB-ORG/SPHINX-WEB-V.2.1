/// <reference types="react" />
import { BranchSwitcherProps, Branch } from './types';
export declare function formatBranchName(str: string): string;
export declare const BranchSwitcher: (props: BranchSwitcherProps) => JSX.Element;
export declare const EditoralBranchSwitcher: ({ listBranches, createBranch, chooseBranch, setModalTitle, }: BranchSwitcherProps) => JSX.Element;
export declare const getFilteredBranchList: (branchList: Branch[], search: string, currentBranchName: string, filter?: 'content' | 'all') => Branch[];
