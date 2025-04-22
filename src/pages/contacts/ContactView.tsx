import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "../../services/bannerService";
// import { ArrowRight, ForwardIcon } from "lucide-react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

const ContactView = () => {
  const { data } = useQuery({
    queryKey: ["GET_BANNERS"],
    queryFn: fetchBanners,
  });

  return (
    <div className="space-y-5 p-5">
      <div>
        <h2>Contact Us</h2>
      </div>

      <div className="space-y-5">
        {data && data.contacts.length > 0 ? (
          data.contacts.map((v, idx) => (
            <a
              key={idx}
              href={`https://${v.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row justify-between items-center bg-secondary rounded-lg px-5 py-3"
            >
              <div className="flex flex-row space-x-2">
                {v.name === "Facebook" && (
                  <img
                    src={"/icons/facebook.png"}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                {v.name === "Viber" && (
                  <img
                    src={"/icons/viber.png"}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                {v.name === "Telegram" && (
                  <img
                    src={"/icons/telegram.png"}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <span>{v.name}</span>{" "}
              </div>

              <a
                href={`https://${v.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary p-1"
              >
                <ChatBubbleIcon className="text-active" />
              </a>
            </a>
          ))
        ) : (
          <div>
            <span className="text-gray-500">"No contacts"</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactView;
