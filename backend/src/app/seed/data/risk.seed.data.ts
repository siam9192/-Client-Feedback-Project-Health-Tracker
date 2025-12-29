import { ProjectRiskSeverity, ProjectRiskStatus } from "../../modules/project-risk/project-risk.interface";

export const sampleRisks = [
  {
    title: 'Database connection failure',
    severity: ProjectRiskSeverity.HIGH,
    mitigationPlan: 'Set up automated monitoring and alerts for DB downtime.',
    status: ProjectRiskStatus.OPEN,
  },
  {
    title: 'Delayed API responses',
    severity:ProjectRiskSeverity.MEDIUM,
    mitigationPlan: 'Implement caching and optimize API endpoints.',
    status: ProjectRiskStatus.OPEN,
  },
  {
    title: 'Data breach',
    severity:ProjectRiskSeverity.LOW,
    mitigationPlan: 'Use encryption, conduct regular security audits.',
    status: ProjectRiskStatus.OPEN,
  },
  {
    title: 'Insufficient server capacity',
    severity: ProjectRiskSeverity.HIGH,
    mitigationPlan: 'Scale servers based on load predictions.',
    status: ProjectRiskStatus.OPEN,
  },
  {
    title: 'Dependency library vulnerabilities',
  severity: ProjectRiskSeverity.LOW,
    mitigationPlan: 'Regularly update dependencies and monitor CVEs.',
    status: ProjectRiskStatus.OPEN,
  },
  {
    title: 'User interface bugs',
    severity: 'medium',
    mitigationPlan: 'Implement automated UI testing and QA cycles.',
    status: ProjectRiskStatus.OPEN,
  },
  {
    title: 'Payment gateway downtime',
    severity: ProjectRiskSeverity.MEDIUM,
    mitigationPlan: 'Have fallback gateways and monitor uptime continuously.',
    status: ProjectRiskStatus.OPEN,
  },
  {
    title: 'Incorrect reporting metrics',
  severity: ProjectRiskSeverity.MEDIUM,
    mitigationPlan: 'Audit data processing pipelines regularly.',
    status: ProjectRiskStatus.OPEN,
  },
  {
    title: 'Slow page load times',
   severity: ProjectRiskSeverity.HIGH,
    mitigationPlan: 'Optimize images, use CDN, and lazy load content.',
    status: ProjectRiskStatus.OPEN,
  },
  {
    title: 'Legal compliance issues',
    severity: ProjectRiskSeverity.LOW,
    mitigationPlan: 'Consult legal experts and ensure all regulations are followed.',
    status: ProjectRiskStatus.OPEN,
  },
];

export default sampleRisks;
