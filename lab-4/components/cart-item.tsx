import { Image } from 'expo-image';
import { View, Text } from 'react-native';
import { Button } from './ui/button';
import { Trash2 } from '~/lib/icons/Trash2';
import { CirclePlus } from '~/lib/icons/CirclePlus';
import { CircleMinus } from '~/lib/icons/CircleMinus';
import { useCartContext } from '~/providers/cart-provider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useState } from 'react';

export function CartItem(props: IProductCardProps & { quantity: number }) {
  const { removeProductFromCart, increasedQuantity, decreasedQuantity } = useCartContext();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <View className="flex-row border-2 border-gray-500 p-2 my-1 rounded-md">
      <Image contentFit='contain' source={{ uri: props?.image }} style={{ marginEnd: 8, aspectRatio: 1, width: 144 }} />
      <View className="flex-1 justify-start flex-col gap-2">
        <Text className="text-lg font-bold line-clamp-2">{props?.title}</Text>
        <View className="flex flex-row justify-between w-full">
          <Text className="text-lg">${props?.price.toFixed(2)} x{props.quantity}</Text>
          <Text className="text-lg text-green-500">${(props?.price * props.quantity).toFixed(2)}</Text>
        </View>
        <View className="flex flex-row w-full">
          <Button size="icon" variant="ghost" onPress={() => {
            if (props.quantity === 1) { setIsAlertOpen(true); return; }
            decreasedQuantity(props);
          }}>
            <CircleMinus className="size-6 text-black" />
          </Button>
          <Button size="icon" variant="ghost" className="ml-2 mr-auto" disabled={props.quantity > 10} onPress={() => increasedQuantity(props)}>
            <CirclePlus className="size-6 text-black" />
          </Button>
          <Button size="icon" variant="destructive" onPress={() => setIsAlertOpen(true)}>
            <Trash2 className="size-6 text-white" />
          </Button>
        </View>
      </View>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you want to remove?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will remove product out of your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={() => removeProductFromCart(props)}>
              <Text className='text-white'>Continue</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
