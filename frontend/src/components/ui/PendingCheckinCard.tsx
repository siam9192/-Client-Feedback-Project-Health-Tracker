import { PendingCheckIn } from '@/types/employee-checkin.type'
import { formatEnumLabel, getProjectStatusColor } from '@/utils/helpers'
import SubmitCheckinModal from '../sections/SubmitCheckinModal'


interface Props {
    checkin:PendingCheckIn
}
function PendingCheckinCard({checkin:check}:Props) {
    
  return (
       <div
              key={check._id}
              className="flex flex-col  p-3 rounded-md border border-gray-200"
            >
              <div className="flex  flex-col gap-2 lg:gap-0  lg:flex-row justify-between lg:items-center">
                <span className="font-medium text-gray-800 text-lg">{check.name}</span>
                <span
                  className={`text-xs md:text-sm font-semibold p-2 rounded-full size-fit ${
                    getProjectStatusColor(check.status)
                  }`}
                >
                  {formatEnumLabel(check.status)}
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-500 font-medium">
              <div className='space-y-3'>
                <div className='space-y-1'>
                    <p className=''>Health Score: {check.healthScore}</p>
                <p>Deadline: {new Date().toDateString()}</p>
                </div>
                   <div className="w-full bg-gray-200 rounded-full h-3 max-w-sm">
                          <div
                            className={`h-3 rounded-full ${getProjectStatusColor(check.status)}`}
                            style={{ width: `${check}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{check.progressPercentage}%</span>
              </div>
              
              </div>
              <div className='flex justify-end'>
                <SubmitCheckinModal  progress={check.progressPercentage} projectId={check._id}/>
              </div>
            
            </div>
  )
}

export default PendingCheckinCard