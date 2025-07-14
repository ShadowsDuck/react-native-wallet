import { useClerk, useUser } from "@clerk/clerk-expo";
import { View, Text, Button } from "react-native";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect } from "react";

const HomeScreen = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user.id);

  console.log(user.id);

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log("transactions loaded: ", transactions);
  console.log("summary loaded: ", summary);

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={() => signOut()} title="logout"></Button>
    </View>
  );
};

export default HomeScreen;
