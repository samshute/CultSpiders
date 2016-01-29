using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Alchemy;
using Alchemy.Classes;
using Newtonsoft.Json;
using System.Net;

namespace VikingRun
{
    class Program
    {
        private static List<UserContext> players = new List<UserContext>();
        private static UserContext presenter = null;
        private static bool acceptingPlayers = true;
        private static List<string> bufferedPlayerConnectionData = new List<string>();

        static void Main(string[] args)
        {
            const int port = 6969;

            new WebSocketServer(port, System.Net.IPAddress.Any)
            {
                OnConnect = OnConnect,
                OnReceive = OnReceive,
                OnDisconnect = OnDisconnect,
                TimeOut = new TimeSpan(0, 5, 0)
            }.Start();

            Console.WriteLine("Server listening on: " + port);

            // Accept commands on the console and keep it alive
            var command = string.Empty;
            while (command != "exit")
            {
                command = Console.ReadLine();
            }
        }

        public static void OnDisconnect(UserContext context)
        {
            Console.WriteLine("Client Disconnection From : " + context.ClientAddress);

            if (presenter != null && presenter.ClientAddress == context.ClientAddress)
            {
                Console.WriteLine("Oh shit we lost the tv.");
                throw new Exception("FUCK - tv out");
            }

            //throw new Exception("Yeah nar we don't handle disconnects");

            /*var remove = players.FirstOrDefault(x => x.ClientAddress.Equals(context.ClientAddress));
            if (remove != null)
            {
                players.Remove(remove);
                Console.WriteLine(context.ClientAddress);
            }*/
        }

        public static void OnConnect(UserContext context)
        {
            Console.WriteLine("Client Connection From : " + context.ClientAddress);
        }

        public static void OnReceive(UserContext context)
        {

            try
            {
                var json = context.DataFrame.ToString();

                Console.WriteLine("Received Data From :" + context.ClientAddress + " | " + json);

                // <3 dynamics
                dynamic obj = JsonConvert.DeserializeObject(json);

                switch ((int)obj.Type)
                {
                    case (int)CommandType.RegisterTalk:
                        OnRegisterTalk(context, json);
                        break;
                    case (int)CommandType.RegisterDisplay:
                        OnRegisterDisplay(context, json);
                        break;
                    case (int)CommandType.Start:
                        OnStart(context, json);
                        break;
                }


                if (presenter != null)
                {
                    Console.WriteLine("Forwarding to Tv: " + json);
                    presenter.Send(json);
                }
            }
            catch (Exception e) // Bad JSON! For shame.
            {
                Console.WriteLine("Exception yo :" + e);
            }
        }

        private static void OnRegisterTalk(UserContext context, dynamic json)
        {
            if (!acceptingPlayers)
                return;

            Console.WriteLine("Connected Controller");

            context.Send(JsonConvert.SerializeObject(new { Type = CommandType.PlayerIdAssigned, Data = new { Id = players.Count } }));
            players.Add(context);

            if (presenter == null)
                bufferedPlayerConnectionData.Add(json);
        }

        private static void OnRegisterDisplay(UserContext context, dynamic json)
        {
            if (presenter != null)
                return;

            presenter = context;

            Console.WriteLine("Connected TV");

            foreach (var bufferMessage in bufferedPlayerConnectionData)
            {
                Console.WriteLine("Forwarding to Tv: " + bufferMessage);
                presenter.Send(bufferMessage);
            }
        }

        private static void OnStart(UserContext context, dynamic json)
        {
            acceptingPlayers = false;

            foreach (var player in players)
                player.Send(JsonConvert.SerializeObject(new { Type = CommandType.StartTimer, Data = new { Time = DateTime.UtcNow.AddSeconds(5) } }));

            presenter.Send(JsonConvert.SerializeObject(new { Type = CommandType.StartTimer, Data = new { Time = DateTime.UtcNow.AddSeconds(5) } }));
        }

        public enum CommandType
        {
            RegisterTalk = 0,
            RegisterDisplay = 1,
            Start = 2,
            Command = 3,
            Disconnected = 4,
            PlayerIdAssigned = 5,
            StartTimer = 6,
        }
    }
}
