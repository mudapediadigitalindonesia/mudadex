"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, User } from "lucide-react";
import { Button } from "../ui/button";

export function Votes() {
  const [votes, setVotes] = useState({
    up: 45,
    down: 10,
    userVote: null as "up" | "down" | null,
  });

  const totalVotes = votes.up + votes.down;
  const upVotePercentage = (votes.up / totalVotes) * 100;
  const downVotePercentage = (votes.down / totalVotes) * 100;

  const handleVote = (type: "up" | "down") => {
    setVotes((prev) => {
      const newVotes = {
        up: prev.up - (prev.userVote === "up" ? 1 : 0),
        down: prev.down - (prev.userVote === "down" ? 1 : 0),
        userVote: null as "up" | "down" | null,
      };

      if (prev.userVote !== type) {
        newVotes[type]++;
        newVotes.userVote = type;
      }

      return newVotes;
    });
  };

  useEffect(() => {
    // Animate the progress bars on mount and when votes change
    const upProgressBar = document.getElementById("up-vote-progress-bar");
    const downProgressBar = document.getElementById("down-vote-progress-bar");
    if (upProgressBar && downProgressBar) {
      upProgressBar.style.width = `${upVotePercentage}%`;
      downProgressBar.style.width = `${downVotePercentage}%`;
    }
  }, [upVotePercentage, downVotePercentage]);

  return (
    <>
      <div className="flex space-x-1 text-[#909090] text-xs mb-2 mt-4 justify-between">
        <span>{upVotePercentage.toFixed(2)}%</span>
        <span>|</span>
        <span>{downVotePercentage.toFixed(2)}%</span>
      </div>
      <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden mb-3 flex">
        <div
          id="up-vote-progress-bar"
          className="h-full bg-[#03a66d] transition-all duration-300 ease-out"
          style={{ width: `${upVotePercentage}%` }}
        />
        <div className="h-full bg-[#2a2a2a] w-[4px]" /> {/* Gap between bars */}
        <div
          id="down-vote-progress-bar"
          className="h-full bg-[#f23645] transition-all duration-300 ease-out"
          style={{ width: `${downVotePercentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-sm w-full gap-2">
        <Button
          onClick={() => handleVote("up")}
          className={`flex items-center flex-1 justify-center ${
            votes.userVote === "up" ? "text-[#03a66d]" : "text-[#7f7f7f]"
          } hover:text-[#03a66d] transition-colors`}
          variant={"secondary"}
        >
          <ThumbsUp className="w-4 h-4 mr-1" />
          <span>{votes.up}</span>
        </Button>
        <Button
          onClick={() => handleVote("down")}
          className={`flex items-center flex-1 justify-center ${
            votes.userVote === "down" ? "text-[#f23645]" : "text-[#7f7f7f]"
          } hover:text-[#f23645] transition-colors`}
          variant={"secondary"}
        >
          <span>{votes.down}</span>
          <ThumbsDown className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </>
  );
}
