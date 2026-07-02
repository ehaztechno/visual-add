export interface ProposalInput {
  companyName: string;
  industry: string;
  bottlenecks: string;
  budget: string;
  teamSize: string;
}

export interface ProjectedROI {
  annualSavingsUSD: number;
  hoursReclaimedWeekly: number;
  efficiencyGainPercent: number;
  paybackPeriodMonths: number;
}

export interface ArchitecturalWorkflow {
  title: string;
  description: string;
  techStack: string[];
  stepByStepFlow: string[];
  impactLevel: string;
}

export interface ImplementationPhase {
  phaseNumber: number;
  title: string;
  durationWeeks: number;
  deliverables: string[];
}

export interface ProposalBlueprint {
  executiveSummary: string;
  projectedROI: ProjectedROI;
  architecturalWorkflows: ArchitecturalWorkflow[];
  implementationPhases: ImplementationPhase[];
  concludingAdvice: string;
}

export interface ThoughtStep {
  stage: string;
  thought: string;
  actionTaken: string;
}

export interface ExecutionMetadata {
  timeElapsedMs: number;
  confidenceScorePercent: number;
  agentStatus: string;
}

export interface PlaygroundResult {
  thoughtChain: ThoughtStep[];
  finalResponse: string;
  executionMetadata: ExecutionMetadata;
}
