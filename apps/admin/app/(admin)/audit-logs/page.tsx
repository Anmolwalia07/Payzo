import { prisma } from "@repo/database";
import AuditLogs, { Logs } from "@repo/ui/AuditLogs";



export default  async function page() {

  const logs:Logs[]=await prisma.log.findMany();
  return (
    <AuditLogs logs={logs}/>
  )
}
