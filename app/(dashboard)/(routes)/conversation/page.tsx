import Header from "@/components/header";
import { MessageSquare } from "lucide-react";

const ConversationPage = () => {
  return (
    <div>
      
      <Header
        title="Conversation"
        description="Advance conversational AI chatbot"
        icon={MessageSquare} 
        iconColor="text-violet-500"
        iconBg='bg-violet-500/10'
        />
      <div className="border-2 border-green-400 px-4 lg:px-8">
        
      </div>
    </div> 
   ); 
}
 
export default ConversationPage;